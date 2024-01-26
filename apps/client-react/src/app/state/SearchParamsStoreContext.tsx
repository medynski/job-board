import { Nullable } from '@job-board/api-interfaces';
import { createContext, useRef } from 'react';
import { StoreApi } from 'zustand';
import {
  SearchParamsStore,
  createSearchParamsStore,
} from './useSearchParamsStore';

export const SearchParamsContext =
  createContext<Nullable<StoreApi<SearchParamsStore>>>(null);

type SearchParamsProviderProps = React.PropsWithChildren<SearchParamsStore>;

export function SearchParamsStoreProvider({
  children,
  ...props
}: Partial<SearchParamsProviderProps>) {
  const storeRef = useRef<StoreApi<SearchParamsStore>>();
  if (!storeRef.current) {
    storeRef.current = createSearchParamsStore(props);
  }
  return (
    <SearchParamsContext.Provider value={storeRef.current}>
      {children}
    </SearchParamsContext.Provider>
  );
}
