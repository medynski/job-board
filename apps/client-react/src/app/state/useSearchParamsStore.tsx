import { SearchParams } from '@job-board/api-interfaces';
import { create } from 'zustand';

const pageSize = '10';
const page = '1';
const search = '';

export type SearchParamsStore = SearchParams & {
  handleSearchPhrase: (newSearchPhrase: string) => void;
  handlePageChange: (newPage: number) => void;
  handleRedirectToHome: () => void;
};

// export const useSearchParamsStore = () => {
//   return createStore<SearchParamsStore>((set) => ({
//     page,
//     search,
//     pageSize,
//     handleSearchPhrase: (newSearchPhrase: string) => {
//       set((state) => ({
//         ...state,
//         page: '1',
//         search: newSearchPhrase,
//       }));
//     },
//     handlePageChange: (newPage: number) => {
//       set((state) => ({
//         ...state,
//         page: String(newPage),
//       }));
//     },
//     handleRedirectToHome: () => {
//       set((state) => ({
//         ...state,
//         page: '1',
//         search: '',
//       }));
//     },
//   }));
// };

export const useSearchParamsStore = create<SearchParamsStore>((set) => ({
  page,
  search,
  pageSize,
  handleSearchPhrase: (newSearchPhrase: string) => {
    set((state) => ({
      ...state,
      page: '1',
      search: newSearchPhrase,
    }));
  },
  handlePageChange: (newPage: number) => {
    set((state) => ({
      ...state,
      page: String(newPage),
    }));
  },
  handleRedirectToHome: () => {
    set((state) => ({
      ...state,
      page: '1',
      search: '',
    }));
  },
}));
