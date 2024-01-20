import { useLocation } from 'react-router-dom';

export const usePagination = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1', 10);

  return { page };
};
