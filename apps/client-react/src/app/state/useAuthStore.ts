import { Nullable, User } from '@job-board/api-interfaces';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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

export const useAuthStore = create<AuthStore>()(
  devtools((set) => {
    return {
      ...initialState,
      signIn: (user: User) => {
        set(
          (state) => ({
            ...state,
            user,
          }),
          false,
          'Auth/signIn'
        );
      },
      signOut: () => {
        set(
          (state) => ({
            ...state,
            user: undefined,
          }),
          false,
          'Auth/signOut'
        );
      },
    };
  })
);
