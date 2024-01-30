import {
  NoFluffJobsResponse,
  Offer,
  Origin,
  Posting,
} from '@job-board/api-interfaces';

export function nfjMapper(data: NoFluffJobsResponse): Offer[] {
  try {
    return data.postings.map((offer: Posting): Offer => {
      return {
        uniqId: offer.id,
        title: offer.title,
        createdAt: new Date(offer.posted).getTime(),
        companyName: offer.name,
        salaryRange: {
          from: offer.salary.from,
          to: offer.salary.to,
        },
        url: 'https://nofluffjobs.com/pl/job/' + offer.url,
        requiredSkills: offer.tiles.values
          .map((item) => item.value)
          .sort((a, b) => a.localeCompare(b)),
        origin: Origin.NFJ,
        seniority: offer.seniority.map((seniority) =>
          seniority.toLocaleLowerCase()
        ),
        companyLogoUrl: 'https://static.nofluffjobs.com/' + offer.logo.original,
        currency: offer.salary.currency.toLocaleLowerCase(),
      };
    });
  } catch (e) {
    return [];
  }
}
