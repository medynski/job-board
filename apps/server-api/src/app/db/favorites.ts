import { Favorite, Nullable, Offer } from '@job-board/api-interfaces';
import { Collection, Db } from 'mongodb';

export const getFavoritesCollection = async (
  db: Db
): Promise<Collection<Favorite>> => {
  return db.collection('favorites');
};

export const getFavoritesCount = async (
  db: Db,
  email: string = ''
): Promise<number> => {
  const regex = new RegExp(email, 'i');
  const favoritesCollection = await getFavoritesCollection(db);
  const favoritesCount = await favoritesCollection.countDocuments({
    email: { $regex: regex },
  });
  return favoritesCount;
};

export const getAllFavorites = async (
  db: Db,
  email: string
): Promise<Nullable<Offer[]>> => {
  const regex = new RegExp(email, 'i');
  const favoritesCollection = await getFavoritesCollection(db);

  const favorites = (await favoritesCollection
    .aggregate(
      [
        {
          $match: { email: regex },
        },
        {
          $lookup: {
            from: 'offers',
            localField: 'offer_uniqId',
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
  email: string,
  offer_uniqId: string
): Promise<void> => {
  const favoritesCollection = await getFavoritesCollection(db);
  await favoritesCollection.insertOne({ email, offer_uniqId });
};

export const deleteSelectedFavorite = async (
  db: Db,
  email: string,
  offer_uniqId: string
): Promise<void> => {
  const favoritesCollection = await getFavoritesCollection(db);
  await favoritesCollection.deleteOne({ offer_uniqId, email });
};
