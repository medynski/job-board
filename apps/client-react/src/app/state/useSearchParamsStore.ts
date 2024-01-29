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
  hasSearchParamsChanged: boolean;
};

const initialState: SearchParamsState = {
  pageSize: '10',
  page: '1',
  search: '',
  currentSearch: '',
  hasSearchParamsChanged: false,
};

export type SearchParamsStore = SearchParamsState & {
  resetSearchParams: () => void;
  handleSearchPhrase: (searchPhrase: string) => void;
  setCurrentSearch: (currentSearch: string) => void;
  handlePageChange: (newPage: number) => void;
};

export const createSearchParamsStore = (
  initProps?: Partial<SearchParamsStore>
) => {
  return createStore<SearchParamsStore>()(
    devtools((set) => {
      return {
        ...initialState,
        ...initProps,
        resetSearchParams: () => {
          set(
            (state) => ({
              ...state,
              ...initialState,
            }),
            false,
            'SearchParams/resetSearchParams'
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
              hasSearchParamsChanged: true,
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
      };
    })
  );
};

export const useSearchParamsStore = <T>(
  selector: (state: SearchParamsStore) => T
): T => {
  const store = useContext(SearchParamsContext);
  if (!store)
    throw new Error('Missing SearchParamsContext.Provider in the tree.');

  return useStore(store, selector);
};
