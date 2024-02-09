import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbarStore } from '../../state/useSnackbarStore';
import { apiBaseUrl } from '../../utils/api-url';

export const useUpdateOffersQuery = () => {
  const queryClient = useQueryClient();
  const open = useSnackbarStore((store) => store.open);

  const fetchJIIT = useMutation({
    mutationFn: () =>
      axios.get(`${apiBaseUrl()}/cron/fetch-jjit`).then((res) => res.data),
    onSuccess: (response) => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['offers'],
        });
      }, 3000);
      open(response);
    },
  });

  const fetchNFJ = useMutation({
    mutationFn: () =>
      axios.get(`${apiBaseUrl()}/cron/fetch-nfj`).then((res) => res.data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ['offers'],
      });
      open(response);
    },
  });

  const fetchExchangeRates = useMutation({
    mutationFn: () =>
      axios
        .get(`${apiBaseUrl()}/cron/fetch-exchange-rates`)
        .then((res) => res.data),
    onSuccess: (response) => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['offers', 'exchangeRates'],
        });
      }, 3000);
      open(response);
    },
  });

  return { fetchJIIT, fetchNFJ, fetchExchangeRates };
};
