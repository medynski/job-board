import { css } from '@emotion/react';

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
      <div
        css={css`
          padding-top: 5px;
        `}
      >
        <span className="material-symbols-outlined">
          integration_instructions
        </span>
      </div>

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
