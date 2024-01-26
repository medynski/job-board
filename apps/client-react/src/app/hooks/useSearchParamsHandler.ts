import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../state/useSearchParamsStore';
import { mapSearchParams } from './useSearchParams';

export const useSearchParamsHandler = () => {
  const page = useSearchParamsStore((state: SearchParamsStore) => state.page);
  const search = useSearchParamsStore(
    (state: SearchParamsStore) => state.search
  );
  const pageSize = useSearchParamsStore(
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
