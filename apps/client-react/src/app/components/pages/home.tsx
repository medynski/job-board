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
      <div className="flex flex-col">
        <aside className="flex flex-row w-full my-2.5">
          <SearchCriteria />
          <Manage />
        </aside>

        <main>
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
      </div>
    </Layout>
  );
};
