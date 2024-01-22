import { Pagination as MuiPagination } from '@mui/material';
import { ChangeEvent, FunctionComponent } from 'react';

export const Pagination: FunctionComponent<{
  totalPages: number;
  page: number;
  onChange: (changeEvent: ChangeEvent<unknown>, page: number) => void;
}> = ({ totalPages, page, onChange }) => {
  return (
    <MuiPagination
      count={totalPages}
      variant="outlined"
      shape="rounded"
      page={page}
      size="small"
      onChange={onChange}
    />
  );
};
