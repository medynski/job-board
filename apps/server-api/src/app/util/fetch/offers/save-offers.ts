import { Offer } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { addOffer } from '../../../db/offer';

export const saveOffers = async (
  db: Db,
  mappedOffers: Offer[]
): Promise<number> => {
  let addedOffersCount = 0;
  try {
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
