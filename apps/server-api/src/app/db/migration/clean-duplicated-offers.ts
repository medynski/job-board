import { Db } from 'mongodb';
import { getOffersCollection } from '../offer';

export const cleanDuplicatedOffers = async (db: Db) => {
  const collection = await getOffersCollection(db);
  const aggregated = await collection
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

  console.warn(aggregated);

  aggregated.forEach(function (doc) {
    doc.dups.shift();
    collection.deleteMany({ _id: { $in: doc.dups } });
  });
};
