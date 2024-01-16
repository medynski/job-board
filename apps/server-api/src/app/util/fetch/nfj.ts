import { NoFluffJobsResponse } from '../../models/nofluffjobs';

export const fetchNFJ = async (
  url: string = 'https://nofluffjobs.com/api/search/posting?pageFrom=1&pageTo=1&pageSize=100&salaryCurrency=PLN&salaryPeriod=month&region=pl'
) => {
  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      criteriaSearch: {
        country: [],
        city: ['remote'],
        more: [],
        employment: [],
        requirement: [],
        salary: [],
        jobPosition: [],
        province: [],
        company: [],
        id: [],
        category: ['frontend'],
        keyword: [],
        jobLanguage: [],
        seniority: [],
      },
      pageSize: 20,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const body = (await response.json()) as NoFluffJobsResponse;
  console.log(body.postings.length);
  return body.postings;
};
