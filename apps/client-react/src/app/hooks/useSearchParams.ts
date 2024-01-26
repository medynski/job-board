import { SearchParams } from '@job-board/api-interfaces';
import { useLocation } from 'react-router-dom';

export const mapSearchParams = (searchParams: SearchParams) => {
  const urlSearchParams = new URLSearchParams();
  if (searchParams.search) {
    urlSearchParams.set('search', searchParams.search);
  }

  if (searchParams.page && +searchParams.page > 1) {
    urlSearchParams.set('page', String(searchParams.page));
  }

  if (+searchParams.pageSize !== 10) {
    urlSearchParams.set('pageSize', String(searchParams.page));
  }

  return urlSearchParams.toString();
};

export const useSearchParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || '1';
  const search = queryParams.get('search') || '';

  return { page, search };
};
