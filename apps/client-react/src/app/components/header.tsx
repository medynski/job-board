import { css } from '@emotion/react';
import IntegrationInstructionsSharpIcon from '@mui/icons-material/IntegrationInstructionsSharp';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div
      css={css`
        border-bottom: 1px solid #222;
        padding: 10px 0;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        font-size: 22px;
      `}
    >
      <Link
        to="/"
        css={css`
          padding-top: 5px;
        `}
      >
        <IntegrationInstructionsSharpIcon />
      </Link>

      <div
        css={css`
          margin-left: 10px;
        `}
      >
        <span>
          <b>Frontend</b> remote jobs
        </span>
      </div>
    </div>
  );
};
