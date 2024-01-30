import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../../state/useAuthStore';
import { apiUrl } from '../../utils/api-url';

export const useFavoritesQuery = () => {
  const userId = useAuthStore((state) => state.user?.userId);
  const queryClient = useQueryClient();

  const handleSuccessMutation = (data: unknown) => {
    queryClient.invalidateQueries({
      queryKey: ['favorites-count', userId],
    });

    queryClient.invalidateQueries({
      queryKey: ['favorites', userId],
    });
  };

  const favorites = useQuery({
    enabled: !!userId,
    queryKey: ['favorites', userId],
    queryFn: () => {
      return axios
        .post(`${apiUrl()}/favorites`, {
          userId: userId,
        })
        .then((res) => res.data);
    },
  });

  const favoritesCount = useQuery({
    enabled: !!userId,
    queryKey: ['favorites-count', userId],
    queryFn: () => {
      return axios
        .post(`${apiUrl()}/favorites/count`, {
          userId: userId,
        })
        .then((res) => res.data);
    },
  });

  const mutationAdd = useMutation({
    mutationFn: (offerUniqId: string) => {
      return axios.post(`${apiUrl()}/favorites/add`, { offerUniqId, userId });
    },
    onSuccess: handleSuccessMutation,
  });

  const mutationRemove = useMutation({
    mutationFn: (offerUniqId: string) => {
      return axios.delete(`${apiUrl()}/favorites/${userId}/${offerUniqId}`);
    },
    onSuccess: handleSuccessMutation,
  });

  return { favorites, favoritesCount, mutationAdd, mutationRemove };
};
