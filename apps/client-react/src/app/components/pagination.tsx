import {
  Pagination as MuiPagination,
  PaginationItem,
  css,
} from '@mui/material';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export const Pagination: FunctionComponent<{
  totalPages: number;
  page: number;
}> = ({ totalPages, page }) => {
  return (
    <MuiPagination
      count={totalPages}
      variant="outlined"
      shape="rounded"
      page={page}
      renderItem={(item) => (
        <PaginationItem
          css={css`
            border: ${item.page ? '1px solid #222' : ''};
          `}
          component={Link}
          to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};
