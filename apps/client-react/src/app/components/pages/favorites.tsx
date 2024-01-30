import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { useFavoritesQuery } from '../../hooks/queries/useFavoritesQuery';
import { useInitialDataQuery } from '../../hooks/queries/useInitialDataQuery';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../../state/useSearchParamsStore';
import { Offers } from '../partials/offers';
import { Layout } from './_layout';

export const Favorites: FunctionComponent = () => {
  const { exchangeRatesQuery } = useInitialDataQuery();
  const { favorites: offersQuery } = useFavoritesQuery();
  const pageSize = useSearchParamsStore(
    (state: SearchParamsStore) => state.pageSize
  );

  return (
    <Layout>
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
