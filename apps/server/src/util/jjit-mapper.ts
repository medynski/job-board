import { JjitOffer, JustJoinItResponse } from '../model/jjit';
import { Offer } from '../../../../libs/api-interfaces/src/lib/models/offer';
import { Origin } from '../../../../libs/api-interfaces/src/lib/models/origin';

export function jjitMapper(data: JustJoinItResponse): Offer[] {
  try {
    return data.pageProps.dehydratedState.queries[0].state.data.pages[0].data.map(
      (offer: JjitOffer) => {
        return {
          uniqId: offer.slug,
          title: offer.title,
          createdAt: offer.publishedAt,
          companyName: offer.companyName,
          salaryRange: {
            from: offer.employmentTypes[0].from,
            to: offer.employmentTypes[0].to,
          },
          url: 'https://justjoin.it/offers/' + offer.slug,
          requiredSkills: offer.requiredSkills,
          origin: Origin.JJIT,
          seniority: [offer.experienceLevel],
        };
      }
    );
  } catch (e) {
    return [];
  }
}
