import { Offer } from '@job-board/api-interfaces';
import { Collection, Db } from 'mongodb';

const getCollection = async (db: Db): Promise<Collection<Offer>> => {
  return db.collection('offers');
};

export const getOffersCount = async (
  db: Db,
  search: string = ''
): Promise<number> => {
  const regex = new RegExp(search, 'i');
  const offersCollection = await getCollection(db);
  const offersDataCount = await offersCollection.countDocuments({
    companyName: { $regex: regex },
  });
  return offersDataCount;
};

export const getAllOffers = async (
  db: Db,
  page: number = 1,
  pageSize: number = 20,
  search: string = ''
): Promise<Offer[]> => {
  const offersCollection = await getCollection(db);
  const regex = new RegExp(search, 'i');
  const offersData = await offersCollection
    .find({ companyName: { $regex: regex } })
    .limit(pageSize)
    .skip(page * pageSize - pageSize)
    .sort({ createdAt: -1 })
    .toArray();
  const now = performance.now();
  while (performance.now() - now < 2000) {
    // just want to show loader for a short while for a better user experience
  }
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
