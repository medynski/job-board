// import { JustJoinItResponse } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { Offer, Origin } from '@job-board/api-interfaces';

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
      url: `https://justjoin.it/offers/${offer.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')}`,
      requiredSkills: offer.skills.map((s) => s.name),
      seniority: [offer.experience_level],
      origin: Origin.JJIT,
      currency: offer.salary_currency.toUpperCase(),
      companyLogoUrl: offer.company_logo_url,
    };
  } catch (error) {
    console.error('Error parsing job offer:', error);
    return null;
  }
};

export const fetchJJIT = async (
  db: Db,
  url: string = 'https://justjoin.it/job-offers/all-locations/javascript?workplace=remote&with-salary=yes'
): Promise<number> => {
  try {
    console.log('Fetching from URL:', url);
    const response = await fetch(url, {
      headers: {
        Accept: 'text/html',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log('HTML length:', html.length);

    // Look for job offer boxes in the HTML that contain data-index
    const jobListingsPattern =
      /<div[^>]*data-index="\d+"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
    const jobListings = Array.from(html.matchAll(jobListingsPattern));

    console.log(`Found ${jobListings.length} potential job listings`);

    if (jobListings.length === 0) {
      throw new Error('No job listings found in HTML');
    }

    const rawOffers: RawJJITOffer[] = [];

    for (const listing of jobListings) {
      const listingHtml = listing[0];
      try {
        // Extract title from h3
        const titleMatch = listingHtml.match(/<h3[^>]*>([^<]*)<\/h3>/);
        console.log('Title match:', titleMatch?.[1]);

        // Extract skills from skill-tag-n divs, looking for the innermost div that contains the skill name
        const skillsPattern =
          /<div class="skill-tag-\d+[^"]*"[^>]*>[\s\S]*?<div[^>]*>[\s\S]*?<div[^>]*>([^<]+)<\/div>/g;
        const skillsMatches = Array.from(listingHtml.matchAll(skillsPattern));
        const skills = skillsMatches
          .map((match) => {
            const skillName = match[1].trim();
            console.log('Found skill:', skillName);
            return skillName;
          })
          .filter(
            (skill) =>
              skill &&
              !['Fully remote', 'Hybrid', 'New'].includes(skill) &&
              skill.length > 0
          );
        console.log('All skills found:', skills);

        // Extract company name - look for it near the logo
        const companyPattern =
          /<img[^>]*id="offerCardCompanyLogo"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/;
        const companyMatch = listingHtml.match(companyPattern);
        console.log('Company match:', companyMatch?.[1]);

        // If no company found, try alternative pattern looking for company name after the logo
        let altMatch = null;
        if (!companyMatch) {
          const altCompanyPattern =
            /id="offerCardCompanyLogo"[\s\S]*?<span[^>]*>([^<]+)<\/span>/;
          altMatch = listingHtml.match(altCompanyPattern);
          if (altMatch) {
            console.log(
              'Found company with alternative pattern:',
              altMatch[1].trim()
            );
          }
        }

        // Extract salary - look for numbers followed by currency
        const salaryMatch = listingHtml.match(
          /<span[^>]*>(\d+[\s,]*\d*)<\/span>[\s\S]*?<span[^>]*>(\d+[\s,]*\d*)<\/span>[\s\S]*?<span[^>]*>([^<]*)<\/span>/
        );
        const salary = {
          from: salaryMatch
            ? parseInt(salaryMatch[1].replace(/[\s,]/g, ''))
            : 0,
          to: salaryMatch ? parseInt(salaryMatch[2].replace(/[\s,]/g, '')) : 0,
          currency: salaryMatch ? salaryMatch[3].replace(/[^A-Z]/g, '') : 'PLN',
        };

        // Extract logo URL
        const logoMatch = listingHtml.match(
          /src="([^"]*)"[^>]*id="offerCardCompanyLogo"/
        );

        if (titleMatch && (companyMatch || altMatch) && skills.length > 0) {
          const companyName = (
            companyMatch ? companyMatch[1] : altMatch[1]
          ).trim();
          console.log('Found offer:', {
            title: titleMatch[1].trim(),
            company: companyName,
            skills,
          });

          rawOffers.push({
            title: titleMatch[1].trim(),
            companyName: companyName,
            employmentTypes: [
              {
                from: salary.from,
                to: salary.to,
                currency: salary.currency,
              },
            ],
            publishedAt: new Date().toISOString(),
            requiredSkills: skills,
            experienceLevel: '',
            companyLogoThumbUrl: logoMatch ? logoMatch[1] : '',
            workplaceType: listingHtml.includes('Fully remote')
              ? 'remote'
              : 'office',
            city: '',
            remoteInterview: listingHtml.includes('Fully remote'),
          });
        } else {
          console.log('Missing required fields in offer:', {
            hasTitle: !!titleMatch,
            hasCompany: !!(companyMatch || altMatch),
            skillsCount: skills.length,
            rawHtml:
              listingHtml.length > 150000
                ? listingHtml.substring(0, 2500) + '...'
                : listingHtml,
          });
        }
      } catch (e) {
        console.log('Error processing offer:', e);
      }
    }

    if (rawOffers.length === 0) {
      throw new Error('No valid job offers found');
    }

    try {
      console.log(`Processing ${rawOffers.length} job offers`);
      return processOffers(
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
              offer.requiredSkills?.map((skill: string) => ({
                name: skill,
              })) || [],
            experience_level: offer.experienceLevel,
            company_logo_url: offer.companyLogoThumbUrl,
            workplace_type: offer.workplaceType,
            city: offer.city,
            remote_interview: offer.remoteInterview,
          })
        )
      );
    } catch (e) {
      console.error('Error parsing job offers:', e);
      throw new Error('Could not parse job offers data');
    }
  } catch (e) {
    console.error('Error fetching data:', e);
    throw e;
  }
};

function processOffers(offers: JJITOffer[]): number {
  console.log('Processing offers:', offers.length);
  const parsedOffers = offers
    .map((offer: JJITOffer) => parseJobOffer(offer))
    .filter((offer: Offer | null): offer is Offer => offer !== null);

  console.log(`Successfully parsed ${parsedOffers.length} job offers`);
  return parsedOffers.length;
}
