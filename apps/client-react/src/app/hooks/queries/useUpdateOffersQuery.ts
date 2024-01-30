import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiBaseUrl } from '../../utils/api-url';

export const useUpdateOffersQuery = () => {
  const queryClient = useQueryClient();

  const fetchJIIT = useMutation({
    mutationFn: () =>
      axios.get(`${apiBaseUrl()}/cron/fetch-jjit`).then((res) => res.data),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['offers'],
        });
      }, 3000);
    },
  });

  const fetchNFJ = useMutation({
    mutationFn: () =>
      axios.get(`${apiBaseUrl()}/cron/fetch-nfj`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['offers'],
      });
    },
  });

  return { fetchJIIT, fetchNFJ };
};
