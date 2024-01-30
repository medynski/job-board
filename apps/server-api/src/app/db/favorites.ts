import { Favorite, Nullable, Offer } from '@job-board/api-interfaces';
import { Collection, Db } from 'mongodb';

export const getFavoritesCollection = async (
  db: Db
): Promise<Collection<Favorite>> => {
  return db.collection('favorites');
};

export const getFavoritesCount = async (
  db: Db,
  userId: string = ''
): Promise<number> => {
  const regex = new RegExp(userId, 'i');
  const favoritesCollection = await getFavoritesCollection(db);
  const favoritesCount = await favoritesCollection.countDocuments({
    userId: { $regex: regex },
  });
  return favoritesCount;
};

export const getAllFavorites = async (
  db: Db,
  userId: string
): Promise<Nullable<Offer[]>> => {
  const regex = new RegExp(userId, 'i');
  const favoritesCollection = await getFavoritesCollection(db);

  const favorites = (await favoritesCollection
    .aggregate(
      [
        {
          $match: { userId: regex },
        },
        {
          $lookup: {
            from: 'offers',
            localField: 'offerUniqId',
            foreignField: 'uniqId',
            as: 'favoriteOffers',
          },
        },
        {
          $unwind: '$favoriteOffers',
        },
        {
          $replaceRoot: { newRoot: '$favoriteOffers' },
        },
        {
          $project: {
            _id: 0,
            uniqId: 1,
            title: 1,
            companyName: 1,
            salaryRange: 1,
            url: 1,
            requiredSkills: 1,
            origin: 1,
            seniority: 1,
            companyLogoUrl: 1,
            currency: 1,
            createdAt: 1,
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    )
    .toArray()) as Offer[];

  return favorites;
};

export const addFavorite = async (
  db: Db,
  userId: string,
  offerUniqId: string
): Promise<void> => {
  const favoritesCollection = await getFavoritesCollection(db);
  await favoritesCollection.insertOne({ userId, offerUniqId });
};

export const deleteSelectedFavorite = async (
  db: Db,
  userId: string,
  offerUniqId: string
): Promise<void> => {
  const favoritesCollection = await getFavoritesCollection(db);
  await favoritesCollection.deleteOne({ offerUniqId, userId });
};
