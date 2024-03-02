import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../../state/useAuthStore';
import { apiUrl } from '../../utils/api-url';

export const usePermissionsQuery = () => {
  const userId = useAuthStore((state) => state.user?.userId);
  const permissionsQuery = useQuery({
    enabled: !!userId,
    queryKey: ['permissions', userId],
    queryFn: () =>
      axios.get(`${apiUrl()}/permission/${userId}`).then((res) => res.data),
  });

  return { permissionsQuery };
};
