import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { useInitialDataQuery } from '../../hooks/queries/useInitialDataQuery';
import { useSearchParamsHandler } from '../../hooks/useSearchParamsHandler';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../../state/useSearchParamsStore';
import { Offers } from '../partials/offers';
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
      <SearchCriteria
        cssStyles={css`
          width: 200px;
          margin-right: 10px;
        `}
      />

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
      </main>
    </Layout>
  );
};
