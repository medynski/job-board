import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { useInitialDataQuery } from '../../hooks/queries/useInitialDataQuery';
import { useSearchParamsHandler } from '../../hooks/useSearchParamsHandler';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../../state/useSearchParamsStore';
import { Manage } from '../partials/manage';
import { Offers } from '../partials/offers';
import { Pagination } from '../partials/pagination';
import { SearchCriteria } from '../partials/search-criteria';
import { Layout } from './_layout';

export const Home: FunctionComponent = () => {
  useSearchParamsHandler();

  const { offersQuery, exchangeRatesQuery } = useInitialDataQuery();
  const pageSize = useSearchParamsStore(
    (state: SearchParamsStore) => state.pageSize
  );

  return (
    <Layout>
      <div
        css={css`
          width: 200px;
          margin-right: 10px;
        `}
      >
        <SearchCriteria />
        <Manage />
      </div>

      <main
        css={css`
          flex-basis: 3;
          flex-grow: 3;
        `}
      >
        <Offers
          offersQuery={offersQuery}
          exchangeRatesQuery={exchangeRatesQuery}
          pageSize={pageSize}
        />
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 0px;
          `}
        >
          <Pagination />
        </div>
      </main>
    </Layout>
  );
};
