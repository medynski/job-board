import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../state/useSearchParamsStore';
import logo from './../../assets/designer.png';
import { SignIn } from './sign-in';

export const Header: FunctionComponent = () => {
  const redirectToHome = useSearchParamsStore(
    (state: SearchParamsStore) => state.handleRedirectToHome
  );

  return (
    <header
      css={css`
        border-bottom: 1px solid #222;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
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
            margin-right: 20px;
          `}
        >
          <span>
            <b>JavaScript</b> remote jobs
          </span>
        </div>
      </div>

      <div>
        <SignIn />
      </div>
    </header>
  );
};
