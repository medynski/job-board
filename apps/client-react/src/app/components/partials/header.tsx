import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../../state/useSearchParamsStore';
import logo from './../../../assets/designer.png';
import { FavoritesIndicator } from './favorites-indicator';
import { SignIn } from './sign-in';

export const Header: FunctionComponent = () => {
  const redirectToHome = useSearchParamsStore(
    (state: SearchParamsStore) => state.resetSearchParams
  );

  return (
    <header className="flex items-center justify-between py-2.5 border-b-black border-b border-solid border-r-0 border-t-0 border-l-0">
      <div className="text-2xl items-center flex">
        <Link to="/">
          <img
            src={logo}
            alt="Job board home"
            className="max-w-10 max-h-10 md:max-w-6 md:max-h-6 pt-1.5 hover:opacity-70 hover:cursor-pointer"
            onClick={redirectToHome}
          />
        </Link>

        <div className="ml-2.5 mr-5 md:block hidden">
          <span data-testid="app-name">
            <b>JavaScript</b> remote jobs
          </span>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <div className="mr-5">
          <Link to="/favorites">
            <FavoritesIndicator />
          </Link>
        </div>
        <SignIn />
      </div>
    </header>
  );
};
