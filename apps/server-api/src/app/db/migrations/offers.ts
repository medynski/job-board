import { Db } from 'mongodb';
import { getCollection } from '../offer';

export const cleanDuplicatedOffers = async (db: Db) => {
  const collection = await getCollection(db);
  const duplicatedRecords = await collection
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
    collection.deleteMany({ _id: { $in: doc.dups } });
  });
};

export const cleanSimilarOffers = async (db: Db) => {
  const collection = await getCollection(db);
  const similarRecords = await collection
    .aggregate([
      {
        $unwind: '$requiredSkills',
      },
      {
        $group: {
          _id: {
            requiredSkill: { $toLower: '$requiredSkills' },
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
    collection.deleteMany({ _id: { $in: doc.dups } });
  });
};

export const sortRequiredSkills = async (db: Db) => {
  const collection = await getCollection(db);
  const records = await collection.find().toArray();

  records.forEach(function (doc) {
    collection.updateOne(
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
  const collection = await getCollection(db);
  collection.createIndex({ uniqId: 1 }, { unique: true });
};
