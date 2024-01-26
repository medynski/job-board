import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../state/useSearchParamsStore';
import { apiUrl } from '../utils/api-url';
import { mapSearchParams } from './useSearchParams';

export const useInitialDataHandler = () => {
  const page = useSearchParamsStore((state: SearchParamsStore) => state.page);
  const search = useSearchParamsStore(
    (state: SearchParamsStore) => state.search
  );
  const pageSize = useSearchParamsStore(
    (state: SearchParamsStore) => state.pageSize
  );

  const [offersQuery, exchangeRatesQuery] = useQueries({
    queries: [
      {
        queryKey: ['offers', page, search],
        queryFn: () => {
          const queryParams = mapSearchParams({
            page: page,
            search: search,
            pageSize: pageSize,
          });

          return axios
            .get(`${apiUrl()}/offers?${queryParams}`)
            .then((res) => res.data);
        },
      },
      {
        queryKey: ['exchangeRates'],
        queryFn: () =>
          axios.get(`${apiUrl()}/exchange-rates`).then((res) => res.data),
      },
    ],
  });

  return { offersQuery, exchangeRatesQuery };
};
