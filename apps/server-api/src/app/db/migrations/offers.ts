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

export const cleanSimilarOffers = async (db: Db) => {
  const offersCollection = await getOffersCollection(db);
  const similarRecords = await offersCollection
    .aggregate([
      {
        $group: {
          _id: {
            requiredSkills: '$requiredSkills',
            title: '$title',
            companyName: '$companyName',
            salaryRange: '$salaryRange',
          },
          dups: { $push: '$_id' },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ])
    .toArray();

  console.warn(similarRecords);

  similarRecords.forEach(function (doc) {
    doc.dups.shift();
    offersCollection.deleteMany({ _id: { $in: doc.dups } });
  });
};

export const sortRequiredSkills = async (db: Db) => {
  const offersCollection = await getOffersCollection(db);
  const records = await offersCollection.find().toArray();

  records.forEach(function (doc) {
    offersCollection.updateOne(
      { _id: doc._id },
      {
        $set: {
          requiredSkills: doc.requiredSkills.sort((a, b) => a.localeCompare(b)),
        },
      }
    );
  });
};

export const addIndex = async (db: Db) => {
  const offersCollection = await getOffersCollection(db);
  offersCollection.createIndex({ uniqId: 1 }, { unique: true });
};
