import { Offer, Origin } from '@job-board/api-interfaces';
import { JjitOffer, JustJoinItResponse } from '../model/jjit';

export function jjitMapper(data: JustJoinItResponse): Offer[] {
  try {
    return data.pageProps.dehydratedState.queries[0].state.data.pages[0].data.map(
      (offer: JjitOffer): Offer => {
        return {
          uniqId: offer.slug,
          title: offer.title,
          createdAt: new Date(offer.publishedAt).getTime(),
          companyName: offer.companyName,
          salaryRange: {
            from: offer.employmentTypes[0].from,
            to: offer.employmentTypes[0].to,
          },
          url: 'https://justjoin.it/offers/' + offer.slug,
          requiredSkills: offer.requiredSkills,
          origin: Origin.JJIT,
          seniority: [offer.experienceLevel],
          companyLogoUrl: offer.companyLogoThumbUrl,
          currency: offer.employmentTypes[0].currency,
        };
      }
    );
  } catch (e) {
    return [];
  }
}
