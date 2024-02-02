import type {} from '@redux-devtools/extension'; // required for devtools typing
import { create } from 'zustand';

type SnackbarState = {
  isOpened: boolean;
  message: string;
};

const initialState: SnackbarState = {
  isOpened: false,
  message: '',
};

export type SnackbarStore = SnackbarState & {
  open: (message: string) => void;
  close: () => void;
};

export const useSnackbarStore = create<SnackbarStore>()((set) => {
  return {
    ...initialState,

    open: (message: string) => {
      set((state) => ({
        ...state,
        message,
        isOpened: true,
      }));
    },
    close: () => {
      set((state) => ({
        ...state,
        isOpened: false,
        message: '',
      }));
    },
  };
});
