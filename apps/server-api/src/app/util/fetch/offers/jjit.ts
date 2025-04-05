import { Db } from 'mongodb';
import { Offer, Origin } from '@job-board/api-interfaces';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { saveOffers } from './save-offers';

interface JJITOffer {
  title: string;
  salary_from: number;
  salary_to: number;
  salary_currency: string;
  company_name: string;
  published_at: string;
  skills: Array<{ name: string }>;
  experience_level: string;
  company_logo_url: string;
  workplace_type: string;
  city: string;
  remote_interview: boolean;
  offer_url: string;
}

interface ScrapedOffer {
  title: string;
  companyName: string;
  employmentTypes: Array<{
    from: number;
    to: number;
    currency: string;
  }>;
  publishedAt: string;
  requiredSkills: string[];
  companyLogoThumbUrl: string;
  city: string;
  offerUrl: string;
}

const parseJobOffer = (offer: JJITOffer): Offer | null => {
  try {
    return {
      uniqId: `jjit_${Buffer.from(offer.title + offer.company_name).toString(
        'base64'
      )}`,
      title: offer.title,
      createdAt: new Date(offer.published_at).getTime(),
      companyName: offer.company_name,
      salaryRange: {
        from: offer.salary_from,
        to: offer.salary_to,
      },
      url: offer.offer_url,
      requiredSkills: offer.skills.map((s) => s.name),
      seniority: [offer.experience_level],
      origin: Origin.JJIT,
      currency: offer.salary_currency.toLowerCase(),
      companyLogoUrl: offer.company_logo_url,
    };
  } catch (error) {
    console.error('Error parsing job offer:', error);
    return null;
  }
};

export const fetchJJIT = async (
  db: Db,
  url: string = process.env.OFFERS_JJIT_URL
): Promise<number> => {
  let addedOffersCount = 0;

  try {
    console.log('Fetching URL:', url);
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    const html = await response.text();
    // console.log('Page content length:', html.length);

    const $ = cheerio.load(html);
    const offers: ScrapedOffer[] = [];

    $('div[data-index]').each((_, element) => {
      try {
        const el = $(element);

        const title = el.find('h3').text().trim();
        const company = el
          .find('svg[data-testid="ApartmentRoundedIcon"] + span')
          .text()
          .trim();

        let location = '';
        const locationIcon = el.find('svg[data-testid="PlaceOutlinedIcon"]');
        if (locationIcon.length) {
          const locationContainer = locationIcon.closest('div');
          location = locationContainer
            .find('span')
            .map((_, span) => $(span).text().trim())
            .get()
            .filter(Boolean)
            .join(', ');
        }

        let salary = '';
        const salaryContainers = el.find('div').filter((_, div) => {
          const spans = $(div).find('span');
          return (
            spans.length >= 3 &&
            /^\d[\d\s]*$/.test(spans.eq(0).text().trim()) &&
            /^\d[\d\s]*$/.test(spans.eq(1).text().trim()) &&
            /^[A-Z]+\/\w+$/.test(spans.eq(2).text().trim())
          );
        });

        if (salaryContainers.length > 0) {
          const spans = $(salaryContainers[0]).find('span');
          const min = spans.eq(0).text().trim();
          const max = spans.eq(1).text().trim();
          const currency = spans.eq(2).text().trim().toLowerCase();
          salary = `${min} - ${max} ${currency}`;
        }

        const parseSalaryString = (salaryStr: string) => {
          const match = salaryStr.match(
            /([\d\s]+)\s*-\s*([\d\s]+)\s*([a-z]{3})/i
          );
          if (!match) return null;

          const from = parseInt(match[1].replace(/\s/g, ''), 10);
          const to = parseInt(match[2].replace(/\s/g, ''), 10);
          const currency = match[3].toUpperCase().toLowerCase();

          return { from, to, currency };
        };

        const logoUrl = el.find('#offerCardCompanyLogo').attr('src') || '';

        const skills = el
          .find('div')
          .filter((_, div) => {
            const $div = $(div);
            return (
              $div.children().length === 1 &&
              $div.children().first().children().length === 1
            );
          })
          .map((_, div) => $(div).text().trim())
          .get()
          .filter(
            (text) => text && !/^\d+$/.test(text) && !['New'].includes(text)
          );

        const href = el.find('a[href]').attr('href') || '';
        const link = href.startsWith('http')
          ? href
          : 'https://justjoin.it' + href;

        const parsedSalary = parseSalaryString(salary);

        if (company && parsedSalary) {
          const offer = {
            title,
            companyName: company,
            employmentTypes: [
              {
                from: parsedSalary.from,
                to: parsedSalary.to,
                currency: parsedSalary.currency,
              },
            ],
            publishedAt: new Date().toISOString(),
            requiredSkills: skills,
            companyLogoThumbUrl: logoUrl,
            city: location,
            offerUrl: link,
          };
          offers.push(offer);
        }
      } catch (error) {
        console.error('Error processing offer element:', error);
      }
    });

    console.log(`Found ${offers.length} offers`);

    const parsedOffers = offers
      .map(
        (offer): JJITOffer => ({
          title: offer.title,
          company_name: offer.companyName,
          salary_from: offer.employmentTypes[0]?.from || 0,
          salary_to: offer.employmentTypes[0]?.to || 0,
          salary_currency:
            offer.employmentTypes[0]?.currency.toLowerCase() || 'pln',
          published_at: offer.publishedAt,
          skills:
            offer.requiredSkills?.map((skill: string) => ({ name: skill })) ||
            [],
          experience_level: '',
          company_logo_url: offer.companyLogoThumbUrl,
          workplace_type: 'remote',
          city: offer.city,
          remote_interview: true,
          offer_url: offer.offerUrl,
        })
      )
      .map(parseJobOffer)
      .filter((offer): offer is Offer => offer !== null);

    // console.log(parsedOffers);

    addedOffersCount = await saveOffers(db, parsedOffers);
    console.log(`Successfully saved ${addedOffersCount} job offers`);
  } catch (e) {
    console.error('Error fetching data:', e);
  }

  return addedOffersCount;
};
