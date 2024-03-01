import { Collection, Db, WithId } from 'mongodb';

type UserPermissions = {
  _id: string;
  userId: string;
  role: 'admin' | 'user';
};

const getCollection = async (db: Db): Promise<Collection<UserPermissions>> => {
  return db.collection('permissions');
};

export const getPermissions = async (
  db: Db,
  userId: string
): Promise<WithId<UserPermissions>> => {
  const collection = await getCollection(db);
  const entryData = await collection.find({ userId }).limit(1).toArray();

  return entryData[0];
};
