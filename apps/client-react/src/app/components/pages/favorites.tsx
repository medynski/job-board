import { css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { useFavoritesQuery } from '../../hooks/queries/useFavoritesQuery';
import { useInitialDataQuery } from '../../hooks/queries/useInitialDataQuery';
import { useAuthStore } from '../../state/useAuthStore';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../../state/useSearchParamsStore';
import { Box } from '../partials/box';
import { Offers } from '../partials/offers';
import { Layout } from './_layout';

export const Favorites: FunctionComponent = () => {
  const { exchangeRatesQuery } = useInitialDataQuery();
  const { favorites: offersQuery } = useFavoritesQuery();
  const pageSize = useSearchParamsStore(
    (state: SearchParamsStore) => state.pageSize
  );

  const { user } = useAuthStore();

  return (
    <Layout>
      <main
        css={css`
          flex-basis: 3;
          flex-grow: 3;
        `}
      >
        {user ? (
          <Offers
            offersQuery={offersQuery}
            exchangeRatesQuery={exchangeRatesQuery}
            pageSize={pageSize}
          />
        ) : (
          <Box>Favorites are available only for logged in users.</Box>
        )}
      </main>
    </Layout>
  );
};
