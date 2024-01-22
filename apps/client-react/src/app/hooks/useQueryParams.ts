import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1', 10);
  const search = queryParams.get('search') || '';

  return { page, search };
};
