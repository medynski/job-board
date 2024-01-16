import { Offer } from '@job-board/api-interfaces';
import { Datastore } from 'nedb-async-await';
import path from 'path';

const offersCollection = Datastore({
  filename: path.resolve(path.dirname(''), './database/offers.db'),
  autoload: true,
});

export const getAllOffers = async (): Promise<Offer[]> => {
  const offersData = await offersCollection.find({});
  return offersData;
};

export const getOffer = async (id: string): Promise<Offer> => {
  const offer = await offersCollection.findOne({ _id: id });
  return offer;
};

export const getFirstOffer = async (): Promise<Offer> => {
  const offer = await offersCollection.findOne({});
  return offer;
};

export const addOffer = async (offer: Offer): Promise<void> => {
  await offersCollection.insert(offer);
};

export const updateOffer = async (offer: Offer): Promise<void> => {
  await offersCollection.update({ _id: offer._id }, offer);
};

export const deleteOffer = async (id: string): Promise<void> => {
  await offersCollection.remove({ _id: id });
};
