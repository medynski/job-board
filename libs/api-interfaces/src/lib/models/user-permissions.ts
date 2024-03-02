import { UserRole } from './user-role';

export type UserPermissions = {
  _id: string;
  userId: string;
  role: UserRole;
};
