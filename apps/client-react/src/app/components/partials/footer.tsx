import CoffeeIcon from '@mui/icons-material/Coffee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { css } from '@mui/material';
import { brown, pink } from '@mui/material/colors';
import { FunctionComponent } from 'react';

export const Footer: FunctionComponent = () => {
  return (
    <footer
      css={css`
        position: fixed;
        bottom: 110px;
        right: -90px;
        transform: rotate(-90deg);
        display: flex;
        justify-content: space-between;

        @media (max-width: 840px) {
          display: none;
        }
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
          left: -5px;
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
    </footer>
  );
};
