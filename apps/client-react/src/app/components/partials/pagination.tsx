import { Pagination as MuiPagination } from '@mui/material';
import { FunctionComponent } from 'react';
import { useInitialDataQuery } from '../../hooks/queries/useInitialDataQuery';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../../state/useSearchParamsStore';

export const Pagination: FunctionComponent = () => {
  const { offersQuery } = useInitialDataQuery();

  const onPageChange = useSearchParamsStore(
    (state: SearchParamsStore) => state.handlePageChange
  );

  const page = useSearchParamsStore((state: SearchParamsStore) => state.page);

  return (
    offersQuery.isSuccess && (
      <MuiPagination
        count={offersQuery.data.pages.totalPages}
        variant="outlined"
        shape="rounded"
        page={+page}
        size="medium"
        onChange={(_, page) => onPageChange(page)}
      />
    )
  );
};
