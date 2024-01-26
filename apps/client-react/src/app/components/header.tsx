import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { useStore } from 'zustand';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../state/useSearchParamsStore';
import logo from './../../assets/designer.png';

export const Header: FunctionComponent = () => {
  const store = useSearchParamsStore();
  const redirectToHome = useStore(
    store,
    (state: SearchParamsStore) => state.handleRedirectToHome
  );

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
      <img
        src={logo}
        alt="Job board home"
        css={css`
          max-width: 25px;
          max-height: 25px;
          padding-top: 5px;

          &:hover {
            opacity: 0.7;
            cursor: pointer;
          }
        `}
        onClick={redirectToHome}
      />

      <div
        css={css`
          margin-left: 10px;
        `}
      >
        <span>
          <b>JavaScript</b> remote jobs
        </span>
      </div>
    </div>
  );
};
