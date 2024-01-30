import { NoFluffJobsResponse } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { nfjMapper } from '../mappers/nfj-mapper';
import { saveOffers } from './save-offers';

export const fetchNFJ = async (
  db: Db,
  url: string = process.env.OFFERS_NFJ_URL
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
    addedOffersCount += await saveOffers(db, mappedOffers);
  } catch (e) {
    console.error(e);
  }

  return addedOffersCount;
};
