import { Offer, Origin } from '@job-board/api-interfaces';

interface TPOffer {
  id: string;
  title: string;
  employer: string;
  logoUrl: string;
  offerUrlName: string;
  technologies: string[];
  positionLevels: Array<{ value: string }>;
  typesOfContracts: Array<{
    salary?: {
      from: number;
      to: number;
      currencySymbol: string;
    };
  }>;
}

interface TPResponse {
  props: {
    pageProps: {
      offersResponse: {
        offers: TPOffer[];
      };
    };
  };
}

export function tpMapper(html: string): Offer[] {
  try {
    console.log('Origin enum:', Origin);
    console.log('Origin.TP:', Origin.TP);
    console.log('Origin values:', Object.values(Origin));
    console.log('Origin keys:', Object.keys(Origin));

    const scriptContent = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
    );
    if (!scriptContent || !scriptContent[1]) {
      console.error('No __NEXT_DATA__ found in HTML');
      return [];
    }

    const data: TPResponse = JSON.parse(scriptContent[1]);
    const offers = data.props.pageProps.offersResponse.offers;

    return offers.map((offer): Offer => {
      const salary = offer.typesOfContracts[0]?.salary;

      // Using string value directly as Origin.TP might not be properly initialized
      const origin = 'TheProtocol' as Origin;
      console.log('Setting origin value:', origin);

      const mappedOffer: Offer = {
        uniqId: offer.id,
        title: offer.title,
        companyName: offer.employer,
        createdAt: Date.now(),
        salaryRange: salary
          ? {
              from: salary.from,
              to: salary.to,
            }
          : undefined,
        url: `https://theprotocol.it/filtry/javascript;t/1;s/zdalna;rw/praca/${offer.offerUrlName}`,
        requiredSkills: offer.technologies.sort((a, b) => a.localeCompare(b)),
        origin,
        seniority: offer.positionLevels.map((level) => level.value),
        currency:
          salary?.currencySymbol.toLowerCase().replace('zł', 'pln') || 'pln',
        companyLogoUrl: offer.logoUrl || '',
      };

      console.log('Mapped offer:', JSON.stringify(mappedOffer, null, 2));
      return mappedOffer;
    });
  } catch (e) {
    console.error('Error mapping TP offers:', e);
    return [];
  }
}
