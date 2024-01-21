import CoffeeIcon from '@mui/icons-material/Coffee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { css } from '@mui/material';
import { brown, pink } from '@mui/material/colors';
import { FunctionComponent } from 'react';
import { Pagination } from './pagination';

export const Footer: FunctionComponent<{
  totalPages: number;
  page: number;
}> = ({ totalPages, page }) => {
  return (
    <footer
      css={css`
        padding: 5px 7.5px;
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
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
      <Pagination totalPages={totalPages} page={page} />
    </footer>
  );
};
