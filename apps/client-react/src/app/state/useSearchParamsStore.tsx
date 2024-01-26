import { Nullable } from '@job-board/api-interfaces';
import { createContext, useContext } from 'react';
import { StoreApi, createStore } from 'zustand';

type SearchParamsState = {
  pageSize: string;
  page: string;
  search: string;
  currentSearch: string;
};

const initialState: SearchParamsState = {
  pageSize: '10',
  page: '1',
  search: '',
  currentSearch: '',
};

export type SearchParamsStore = SearchParamsState & {
  initSearchParams: (page: string, search: string) => void;
  handleSearchPhrase: (searchPhrase: string) => void;
  setCurrentSearch: (currentSearch: string) => void;
  handlePageChange: (newPage: number) => void;
  handleRedirectToHome: () => void;
};

export const createSearchParamsStore = (
  initProps?: Partial<SearchParamsStore>
) => {
  return createStore<SearchParamsStore>((set) => {
    return {
      ...initialState,
      ...initProps,
      initSearchParams: (page: string, search: string) => {
        console.info('Init search params: ', { page, search });
        set((state) => ({
          ...state,
          page,
          search,
        }));
      },
      handleSearchPhrase: (searchPhrase: string) => {
        console.info('Handle search phrase: ', searchPhrase);
        set((state) => ({
          ...state,
          page: '1',
          search: searchPhrase,
        }));
      },
      setCurrentSearch: (currentSearch: string) => {
        console.info('Set current search: ', currentSearch);
        set((state) => ({
          ...state,
          currentSearch,
        }));
      },
      handlePageChange: (newPage: number) => {
        console.info('Handle page change: ', newPage);
        set((state) => ({
          ...state,
          page: String(newPage),
        }));
      },
      handleRedirectToHome: () => {
        console.info('Handle redirect to home');
        set((state) => ({
          ...state,
          page: '1',
          search: '',
          currentSearch: '',
        }));
      },
    };
  });
};

export const SearchParamsContext =
  createContext<Nullable<StoreApi<SearchParamsStore>>>(null);

export const useSearchParamsStore = () => {
  const store = useContext(SearchParamsContext);
  if (!store)
    throw new Error('Missing SearchParamsContext.Provider in the tree.');

  return store;
};
