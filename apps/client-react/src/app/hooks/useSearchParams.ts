import { useLocation } from 'react-router-dom';

export type SearchParams = {
  page?: number;
  search?: string;
  pageSize: number;
};

const mapSearchParams = (searchParams: SearchParams) => {
  const urlSearchParams = new URLSearchParams();
  if (searchParams.search) {
    urlSearchParams.set('search', searchParams.search);
  }

  if (searchParams.page && searchParams.page > 1) {
    urlSearchParams.set('page', String(searchParams.page));
  }

  if (searchParams.pageSize !== 10) {
    urlSearchParams.set('pageSize', String(searchParams.page));
  }

  return urlSearchParams.toString();
};

export const useSearchParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1', 10);
  const search = queryParams.get('search') || '';

  return { page, search, mapSearchParams };
};
