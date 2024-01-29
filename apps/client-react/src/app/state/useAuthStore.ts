import { Nullable, User } from '@job-board/api-interfaces';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { create } from 'zustand';

type AuthState = {
  user: Nullable<User>;
};

const initialState: AuthState = {
  user: null,
};

export type AuthStore = AuthState & {
  signIn: (user: User) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => {
  return {
    ...initialState,
    signIn: (user: User) => {
      set((state) => ({
        ...state,
        user,
      }));
    },
    signOut: () => {
      set((state) => ({
        ...state,
        user: undefined,
      }));
    },
  };
});
