import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useQueryParams } from '../hooks/useQueryParams';

export const Pagination: FunctionComponent<{ totalPages: number }> = ({
  totalPages,
}) => {
  const { page } = useQueryParams();

  return (
    <nav>
      <Link to={page === 1 ? '#' : `/?page=${Math.max(page - 1, 1)}`}>
        Previous
      </Link>
      <span
        css={css`
          display: inline-block;
          margin-right: 20px;
          margin-left: 20px;
        `}
      >
        {page}
      </span>
      <Link
        to={
          page === totalPages ? '#' : `/?page=${Math.min(page + 1, totalPages)}`
        }
      >
        Next
      </Link>
    </nav>
  );
};
