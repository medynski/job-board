import { NoFluffJobsResponse } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { addOffer } from '../../db/offer';
import { nfjMapper } from '../nfj-mapper';

export const fetchNFJ = async (
  db: Db,
  url: string = 'https://nofluffjobs.com/api/search/posting?page=1&limit=200&salaryCurrency=PLN&salaryPeriod=month&region=pl'
) => {
  let addedOffersCount = 0;
  try {
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        rawSearch:
          'city=remote keyword=java-script category=frontend,fullstack',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const body = (await response.json()) as NoFluffJobsResponse;
    const mappedOffers = nfjMapper(body);
    await Promise.all(
      mappedOffers.map(async (offer) => {
        try {
          await addOffer(db, offer);
          addedOffersCount += 1;
        } catch (e) {
          // we don't care about duplicates
          console.error('Something went wrong while fetching offers from NFJ.');
        }
      })
    );
  } catch (e) {
    console.error(e);
  }

  return addedOffersCount;
};
