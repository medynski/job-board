import { Db } from 'mongodb';
import { Offer, Origin } from '@job-board/api-interfaces';
import puppeteer from 'puppeteer';
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

interface RawJJITOffer {
  title: string;
  companyName: string;
  employmentTypes: Array<{
    from: number;
    to: number;
    currency: string;
  }>;
  publishedAt: string;
  requiredSkills: string[];
  experienceLevel: string;
  companyLogoThumbUrl: string;
  workplaceType: string;
  city: string;
  remoteInterview: boolean;
  offerUrl: string;
}

interface SourceJJITOffer {
  title: string;
  companyName: string;
  employmentTypes: Array<{
    from: number;
    to: number;
    currency: string;
  }>;
  publishedAt: string;
  requiredSkills: string[];
  experienceLevel: string;
  companyLogoThumbUrl: string;
  workplaceType: string;
  city: string;
  remoteInterview: boolean;
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
  let browser;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
      executablePath:
        process.platform === 'darwin'
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : undefined,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    );

    // Set viewport to ensure proper rendering
    await page.setViewport({ width: 1920, height: 32000 });

    console.log('Navigating to URL:', url);
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const pageContent = await page.content();
    console.log('Page content length:', pageContent.length);

    // Wait for the offers to be loaded
    console.log('Waiting for offers to load...');
    await page.waitForSelector('[data-index]', { timeout: 30000 });

    const { offers: offersData, logs } = await page.evaluate(() => {
      const offers = [];
      const logs = [];
      const offerElements = document.querySelectorAll('div[data-index]');

      logs.push(`Found offer elements: ${offerElements.length}`);

      offerElements.forEach((element, index) => {
        try {
          logs.push(`Processing offer ${index + 1}`);

          const contentContainer = element;
          logs.push(
            'Content container HTML: ' + (contentContainer?.outerHTML || 'null')
          );

          const container = contentContainer.querySelector(
            'div[class*="MuiBox-root"]'
          );

          const parseOffer = (el: Element) => {
            const title = el.querySelector('h3')?.textContent.trim() || '';

            const company =
              Array.from(
                el.querySelectorAll(
                  'svg[data-testid="ApartmentRoundedIcon"] + span'
                )
              ).map((span) => span.textContent.trim())[0] || '';

            const locationIcon = el.querySelector(
              'svg[data-testid="PlaceOutlinedIcon"]'
            );
            let location = '';
            if (locationIcon) {
              const locationContainer = locationIcon.closest('div');
              const locSpans = locationContainer.querySelectorAll('span');
              location = Array.from(locSpans)
                .map((s) => s.textContent.trim())
                .filter(Boolean)
                .join(', ');
            }

            let salary = '';
            const salaryContainers = Array.from(
              el.querySelectorAll('div')
            ).filter((div) => {
              const spans = div.querySelectorAll('span');
              return (
                spans.length >= 3 &&
                /^\d[\d\s]*$/.test(spans[0].textContent.trim()) &&
                /^\d[\d\s]*$/.test(spans[1].textContent.trim()) &&
                /^[A-Z]+\/\w+$/.test(spans[2].textContent.trim())
              );
            });

            if (salaryContainers.length > 0) {
              const spans = salaryContainers[0].querySelectorAll('span');
              const min = spans[0].textContent.trim();
              const max = spans[1].textContent.trim();
              const currency = spans[2].textContent.trim();
              salary = `${min} - ${max} ${currency}`;
            }

            const logoUrl =
              el.querySelector('#offerCardCompanyLogo')?.getAttribute('src') ||
              '';

            const skills = Array.from(el.querySelectorAll('div'))
              .filter(
                (d) =>
                  d.childElementCount === 1 &&
                  d.firstElementChild?.childElementCount === 1
              )
              .map((d) =>
                d.firstElementChild.firstElementChild?.textContent?.trim()
              )
              .filter(
                (text) => text && !/^\d+$/.test(text) && !['New'].includes(text)
              );

            const href =
              el.querySelector('a[href]')?.getAttribute('href') || '';
            const link = href.startsWith('http')
              ? href
              : 'https://justjoin.it' + href;

            const parseSalaryString = (salaryStr: string) => {
              const match = salaryStr.match(
                /([\d\s]+)\s*-\s*([\d\s]+)\s*([A-Z]{3})/
              );
              if (!match) return null;

              const from = parseInt(match[1].replace(/\s/g, ''), 10);
              const to = parseInt(match[2].replace(/\s/g, ''), 10);
              const currency = match[3];

              return { from, to, currency };
            };

            const parsedSalary = parseSalaryString(salary);
            const parsedOffer = {
              title,
              company,
              location,
              salary: {
                from: parsedSalary.from,
                to: parsedSalary.to,
                currency: parsedSalary.currency.toLowerCase(),
              },
              skills,
              logoUrl,
              link,
            };

            return parsedOffer;
          };

          const offer = parseOffer(container);

          if (offer.company) {
            const singleOffer = {
              title: offer.title,
              companyName: offer.company,
              employmentTypes: [offer.salary],
              publishedAt: new Date().toISOString(),
              requiredSkills: offer.skills,
              companyLogoThumbUrl: offer.logoUrl,
              city: offer.location,
              offerUrl: offer.link,
              salary: offer.salary,
            };
            logs.push('Single offer: ', singleOffer);
            offers.push(singleOffer);
          } else {
            logs.push('Skipping offer due to missing required fields');
          }
        } catch (error) {
          logs.push('Error processing offer element: ' + error);
        }
      });

      logs.push('Total offers processed: ' + offers.length);
      return { offers, logs };
    });

    // Log all the collected logs
    logs.forEach((log) => console.log(log));

    if (!offersData || offersData.length === 0) {
      console.error('No valid offers found after processing');
      throw new Error('No valid offers found after processing');
    }

    console.log(`Found ${offersData.length} offers`);

    const rawOffers: RawJJITOffer[] = offersData.map(
      (offer: SourceJJITOffer) => {
        return {
          title: offer.title,
          companyName: offer.companyName,
          employmentTypes: [
            {
              from: offer.employmentTypes?.[0]?.from || 0,
              to: offer.employmentTypes?.[0]?.to || 0,
              currency: offer.employmentTypes?.[0]?.currency || 'PLN',
            },
          ],
          publishedAt: offer.publishedAt || new Date().toISOString(),
          requiredSkills: offer.requiredSkills || [],
          experienceLevel: offer.experienceLevel || '',
          companyLogoThumbUrl: offer.companyLogoThumbUrl || '',
          workplaceType: offer.workplaceType || 'office',
          city: offer.city || '',
          remoteInterview: offer.remoteInterview || false,
          offerUrl: offer.offerUrl || '',
        };
      }
    );

    return processOffers(
      db,
      rawOffers.map(
        (offer: RawJJITOffer): JJITOffer => ({
          title: offer.title,
          company_name: offer.companyName,
          salary_from: offer.employmentTypes[0]?.from || 0,
          salary_to: offer.employmentTypes[0]?.to || 0,
          salary_currency: (
            offer.employmentTypes[0]?.currency || 'PLN'
          ).toUpperCase(),
          published_at: offer.publishedAt,
          skills:
            offer.requiredSkills?.map((skill: string) => ({ name: skill })) ||
            [],
          experience_level: offer.experienceLevel,
          company_logo_url: offer.companyLogoThumbUrl,
          workplace_type: offer.workplaceType,
          city: offer.city,
          remote_interview: offer.remoteInterview,
          offer_url: offer.offerUrl,
        })
      )
    );
  } catch (e) {
    console.error('Error fetching data:', e);
    throw e;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const processOffers = async (db: Db, offers: JJITOffer[]): Promise<number> => {
  console.log('Processing offers:', offers.length);
  const parsedOffers = offers
    .map((offer: JJITOffer) => parseJobOffer(offer))
    .filter((offer: Offer | null): offer is Offer => offer !== null);

  const addedOffersCount = await saveOffers(db, parsedOffers);
  console.log(`Successfully parsed ${parsedOffers.length} job offers`);
  return addedOffersCount;
};
