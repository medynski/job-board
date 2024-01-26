import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../state/useSearchParamsStore';
import { mapSearchParams } from './useSearchParams';

export const useSearchParamsHandler = () => {
  const store = useSearchParamsStore();
  const page = useStore(store, (state: SearchParamsStore) => state.page);
  const search = useStore(store, (state: SearchParamsStore) => state.search);
  const pageSize = useStore(
    store,
    (state: SearchParamsStore) => state.pageSize
  );

  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = mapSearchParams({
      page: page,
      search: search,
      pageSize: pageSize,
    });

    navigate(`/?${queryParams}`);
  }, [page, search, navigate, pageSize]);
};
