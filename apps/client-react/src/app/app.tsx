import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { FunctionComponent } from 'react';
import { Box } from './components/box';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { OfferBox } from './components/offer-box';
import { OfferBoxBlankSlate } from './components/offer-box-blank-slate';
import { SearchBox } from './components/search-box';
import { useInitialDataHandler } from './hooks/useInitialDataHandler';
import { useSearchParamsHandler } from './hooks/useSearchParamsHandler';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from './state/useSearchParamsStore';

const MainWrapper = styled.div`
  position: relative;
  width: 70%;
  margin: 0 auto;
`;

export const App: FunctionComponent = () => {
  useSearchParamsHandler();
  const { offersQuery, exchangeRatesQuery } = useInitialDataHandler();
  const pageSize = useSearchParamsStore(
    (state: SearchParamsStore) => state.pageSize
  );

  if (offersQuery.error || exchangeRatesQuery.error)
    return (
      'An error has occurred: ' + offersQuery.error?.message ||
      exchangeRatesQuery.error?.message
    );

  return (
    <MainWrapper>
      <Header />

      <section
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Box
          css={css`
            width: 200px;
          `}
        >
          <aside>
            <div
              css={css`
                margin-bottom: 5px;
                font-size: 14px;
              `}
            >
              Search criteria:
            </div>
            <SearchBox />
          </aside>
        </Box>

        <main
          css={css`
            flex-basis: 3;
            flex-grow: 3;
          `}
        >
          {offersQuery.isPending || exchangeRatesQuery.isPending
            ? new Array(+pageSize)
                .fill(null)
                .map((_, index) => <OfferBoxBlankSlate key={index} />)
            : offersQuery.data.offers.map((offer: Offer, index: number) => (
                <OfferBox
                  offer={offer}
                  exchangeRates={exchangeRatesQuery.data}
                  key={index}
                />
              ))}
        </main>
      </section>

      {offersQuery.isSuccess && (
        <Footer totalPages={offersQuery.data.pages.totalPages} />
      )}
    </MainWrapper>
  );
};

export default App;
