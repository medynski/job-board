import { CurrencyResponse } from '@job-board/api-interfaces';
import { Collection, Db, WithId } from 'mongodb';

const getCollection = async (db: Db): Promise<Collection<CurrencyResponse>> => {
  return db.collection('exchange-rates');
};

export const getCurrentExchangeRates = async (
  db: Db
): Promise<WithId<CurrencyResponse>> => {
  const collection = await getCollection(db);
  const entryData = await collection
    .find()
    .sort({ timestamp: -1 })
    .limit(1)
    .toArray();

  return entryData[0];
};

export const addExchangeRates = async (
  db: Db,
  entry: CurrencyResponse
): Promise<void> => {
  const collection = await getCollection(db);
  await collection.insertOne(entry);
};
