import { Offer } from '@job-board/api-interfaces';
import { Collection, Db } from 'mongodb';

export const getOffersCollection = async (
  db: Db
): Promise<Collection<Offer>> => {
  return db.collection('offers');
};

export const getOffersCount = async (
  db: Db,
  search: string = ''
): Promise<number> => {
  const regex = new RegExp(search, 'i');
  const offersCollection = await getOffersCollection(db);
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
  const offersCollection = await getOffersCollection(db);
  const regex = new RegExp(search, 'i');
  const offersData = await offersCollection
    .find({ companyName: { $regex: regex } })
    .limit(pageSize)
    .skip(page * pageSize - pageSize)
    .sort({ createdAt: -1 })
    .toArray();
  return offersData;
};

export const getOfferByUniqId = async (
  db: Db,
  uniqId: string
): Promise<Offer[]> => {
  const offersCollection = await getOffersCollection(db);
  const offersData = await offersCollection.find({ uniqId }).toArray();
  return offersData;
};

export const getOffer = async (db: Db, id: string): Promise<Offer> => {
  const offersCollection = await getOffersCollection(db);
  const offer = await offersCollection.findOne({ _id: id });
  return offer;
};

export const addOffer = async (db: Db, offer: Offer): Promise<void> => {
  const offersCollection = await getOffersCollection(db);
  await offersCollection.insertOne(offer);
};

export const updateOffer = async (db: Db, offer: Offer): Promise<void> => {
  const offersCollection = await getOffersCollection(db);
  await offersCollection.updateOne({ _id: offer._id }, offer);
};

export const deleteOffer = async (db: Db, id: string): Promise<void> => {
  const offersCollection = await getOffersCollection(db);
  await offersCollection.deleteOne({ _id: id });
};
