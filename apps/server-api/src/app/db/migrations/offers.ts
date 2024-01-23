import { Db } from 'mongodb';
import { getOffersCollection } from '../offer';

export const cleanDuplicatedOffers = async (db: Db) => {
  const offersCollection = await getOffersCollection(db);
  const duplicatedRecords = await offersCollection
    .aggregate([
      {
        $group: {
          _id: { uniqId: '$uniqId' },
          dups: { $push: '$_id' },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ])
    .toArray();

  console.warn(duplicatedRecords);

  duplicatedRecords.forEach(function (doc) {
    doc.dups.shift();
    offersCollection.deleteMany({ _id: { $in: doc.dups } });
  });
};

export const addIndex = async (db: Db) => {
  const offersCollection = await getOffersCollection(db);
  offersCollection.createIndex({ uniqId: 1 }, { unique: true });
};
