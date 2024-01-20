import { Offer } from '@job-board/api-interfaces';
import { Collection, Db } from 'mongodb';

const getCollection = async (db: Db): Promise<Collection<Offer>> => {
  return db.collection('offers');
};

export const getOffersCount = async (db: Db): Promise<number> => {
  const offersCollection = await getCollection(db);
  const offersDataCount = await offersCollection.countDocuments();
  return offersDataCount;
};

export const getAllOffers = async (
  db: Db,
  page: number = 1,
  pageSize: number = 20
): Promise<Offer[]> => {
  const offersCollection = await getCollection(db);
  const offersData = await offersCollection
    .find()
    .limit(pageSize)
    .skip(page * pageSize - pageSize)
    .sort({ createdAt: -1 })
    .toArray();
  return offersData;
};

export const getOffer = async (db: Db, id: string): Promise<Offer> => {
  const offersCollection = await getCollection(db);
  const offer = await offersCollection.findOne({ _id: id });
  return offer;
};

export const addOffer = async (db: Db, offer: Offer): Promise<void> => {
  const offersCollection = await getCollection(db);
  await offersCollection.insertOne(offer);
};

export const updateOffer = async (db: Db, offer: Offer): Promise<void> => {
  const offersCollection = await getCollection(db);
  await offersCollection.updateOne({ _id: offer._id }, offer);
};

export const deleteOffer = async (db: Db, id: string): Promise<void> => {
  const offersCollection = await getCollection(db);
  await offersCollection.deleteOne({ _id: id });
};
