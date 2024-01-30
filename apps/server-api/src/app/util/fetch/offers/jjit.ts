import { JustJoinItResponse } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { jjitMapper } from '../mappers/jjit-mapper';
import { saveOffers } from './save-offers';

export const fetchJJIT = async (
  db: Db,
  url: string = process.env.OFFERS_JJIT_URL
): Promise<number> => {
  let addedOffersCount = 0;

  try {
    const response = await fetch(url);
    const body = (await response.json()) as JustJoinItResponse;
    const mappedOffers = jjitMapper(body);
    addedOffersCount += await saveOffers(db, mappedOffers);
  } catch (e) {
    console.error(e);
  }
  return addedOffersCount;
};
