import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../../state/useAuthStore';
import { apiUrl } from '../../utils/api-url';

export const useFavoritesQuery = () => {
  const user = useAuthStore((state) => state.user);

  const favorites = useQuery({
    enabled: !!user,
    queryKey: ['favorites', user?.userId],
    queryFn: () => {
      return axios
        .post(`${apiUrl()}/favorites`, {
          userId: user?.userId,
        })
        .then((res) => res.data);
    },
  });

  return { favorites };
};
