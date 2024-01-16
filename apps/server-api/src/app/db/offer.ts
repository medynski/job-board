import { Offer } from '@job-board/api-interfaces';
import { Datastore } from 'nedb-async-await';
import path from 'path';

const offersCollection = Datastore({
  filename: path.resolve(path.dirname(''), './database/offers.db'),
  autoload: true,
});

export const addOffer = async (offer: Offer): Promise<void> => {
  await offersCollection.insert(offer);
};

export const getAllOffers = async (): Promise<Offer[]> => {
  const offersData = await offersCollection.find({});
  return offersData;
};
