import { Nullable, Offer } from '@job-board/api-interfaces';
import { Collection, Db } from 'mongodb';

export const getCollection = async (db: Db): Promise<Collection<Offer>> => {
  return db.collection('offers');
};

export const getOffersCount = async (
  db: Db,
  search: string = ''
): Promise<number> => {
  const regex = new RegExp(search, 'i');
  const collection = await getCollection(db);
  const offersDataCount = await collection.countDocuments({
    companyName: { $regex: regex },
  });
  return offersDataCount;
};

export const getAllOffers = async (
  db: Db,
  pageNumber: number = 1,
  pageSize: number = 20,
  search: Nullable<string> = null,
  salaryRangeFrom: Nullable<number> = null,
  salaryRangeTo: Nullable<number> = null,
  createDateFrom: Nullable<number> = null,
  createDateTo: Nullable<number> = null,
  requiredSkills: Nullable<string[]> = null
): Promise<{ count: number; results: Offer[] }> => {
  const collection = await getCollection(db);

  const $match = {};
  if (search) {
    const $regex = new RegExp(search, 'i');
    $match['$or'] = [{ title: { $regex } }, { companyName: { $regex } }];
  }
  if (salaryRangeFrom) {
    $match['salaryRange.from'] = { $gte: salaryRangeFrom };
  }
  if (salaryRangeTo) {
    $match['salaryRange.to'] = { $lte: salaryRangeTo };
  }
  if (createDateFrom) {
    $match['createdAt'] = { $gte: createDateFrom };
  }
  if (createDateTo) {
    $match['createdAt'] = { $lte: createDateTo };
  }
  if (requiredSkills) {
    $match['requiredSkills'] = {
      $elemMatch: {
        $in: requiredSkills,
      },
    };
  }

  const offersData = await collection
    .aggregate(
      [
        {
          $match,
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            results: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            count: 1,
            results: {
              $slice: ['$results', pageSize * (pageNumber - 1), pageSize],
            },
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    )
    .toArray();

  const { count, results } = offersData[0] || { count: 0, results: [] };
  return { count, results };
};

export const getOfferByUniqId = async (
  db: Db,
  uniqId: string
): Promise<Offer[]> => {
  const collection = await getCollection(db);
  const offersData = await collection.find({ uniqId }).toArray();
  return offersData;
};

export const getOffer = async (db: Db, id: string): Promise<Offer> => {
  const collection = await getCollection(db);
  const offer = await collection.findOne({ _id: id });
  return offer;
};

export const addOffer = async (db: Db, offer: Offer): Promise<void> => {
  const collection = await getCollection(db);
  await collection.insertOne(offer);
};

export const updateOffer = async (db: Db, offer: Offer): Promise<void> => {
  const collection = await getCollection(db);
  await collection.updateOne({ _id: offer._id }, offer);
};

export const deleteOffer = async (db: Db, id: string): Promise<void> => {
  const collection = await getCollection(db);
  await collection.deleteOne({ _id: id });
};
