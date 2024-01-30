import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Offers } from './components/offers';
import { SearchCriteria } from './components/search-criteria';
import { useInitialDataQuery } from './hooks/queries/useInitialDataQuery';
import { useSearchParamsHandler } from './hooks/useSearchParamsHandler';

const MainWrapper = styled.div`
  position: relative;
  width: 70%;
  margin: 0 auto;
`;

export const App: FunctionComponent = () => {
  useSearchParamsHandler();
  const { offersQuery, exchangeRatesQuery } = useInitialDataQuery();

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
          <Offers />
        </main>
      </section>

      {offersQuery.isSuccess && (
        <Footer totalPages={offersQuery.data.pages.totalPages} />
      )}
    </MainWrapper>
  );
};

export default App;
