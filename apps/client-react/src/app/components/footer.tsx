import CoffeeIcon from '@mui/icons-material/Coffee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { css } from '@mui/material';
import { brown, pink } from '@mui/material/colors';
import { FunctionComponent } from 'react';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../state/useSearchParamsStore';
import { Pagination } from './pagination';

export const Footer: FunctionComponent<{
  totalPages: number;
  page: number;
}> = ({ totalPages, page }) => {
  const onPageChange = useSearchParamsStore(
    (state: SearchParamsStore) => state.handlePageChange
  );

  return (
    <footer
      css={css`
        padding: 5px 7.5px 30px;
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          top: -15px;
          left: 10px;
        `}
      >
        <div>Built with</div>{' '}
        <FavoriteIcon
          css={css`
            font-size: 14px;
            fill: ${pink[500]};
            margin-left: 5px;
            margin-right: 5px;
          `}
        />
        <div> and </div>
        <CoffeeIcon
          css={css`
            font-size: 14px;
            fill: ${brown[500]};
            margin-left: 5px;
            margin-right: 5px;
          `}
        />
        <div>
          by{' '}
          <a
            href="https://github.com/medynski"
            title="My github profile"
            target="_blank"
            rel="noreferrer"
          >
            @medynski
          </a>
        </div>
        .
      </div>
      <Pagination
        totalPages={totalPages}
        page={page}
        onChange={(_, page) => onPageChange(page)}
      />
    </footer>
  );
};
