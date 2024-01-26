import type {} from '@redux-devtools/extension'; // required for devtools typing
import { useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SearchParamsContext } from './SearchParamsStoreContext';

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
  return createStore<SearchParamsStore>()(
    devtools((set) => {
      return {
        ...initialState,
        ...initProps,
        initSearchParams: (page: string, search: string) => {
          set(
            (state) => ({
              ...state,
              page,
              search,
            }),
            false,
            'SearchParams/initSearchParams'
          );
        },
        handleSearchPhrase: (searchPhrase: string) => {
          set(
            (state) => ({
              ...state,
              page: '1',
              search: searchPhrase,
            }),
            false,
            'SearchParams/handleSearchPhrase'
          );
        },
        setCurrentSearch: (currentSearch: string) => {
          set(
            (state) => ({
              ...state,
              currentSearch,
            }),
            false,
            'SearchParams/setCurrentSearch'
          );
        },
        handlePageChange: (newPage: number) => {
          set(
            (state) => ({
              ...state,
              page: String(newPage),
            }),
            false,
            'SearchParams/handlePageChange'
          );
        },
        handleRedirectToHome: () => {
          set(
            (state) => ({
              ...state,
              page: '1',
              search: '',
              currentSearch: '',
            }),
            false,
            'SearchParams/handleRedirectToHome'
          );
        },
      };
    })
  );
};

export const useSearchParamsStore = <T,>(
  selector: (state: SearchParamsStore) => T
): T => {
  const store = useContext(SearchParamsContext);
  if (!store)
    throw new Error('Missing SearchParamsContext.Provider in the tree.');

  return useStore(store, selector);
};
