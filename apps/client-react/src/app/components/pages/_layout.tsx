import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useInitialDataQuery } from '../../hooks/queries/useInitialDataQuery';
import { Footer } from '../partials/footer';
import { Header } from '../partials/header';

const MainWrapper = styled.div`
  position: relative;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { offersQuery, exchangeRatesQuery } = useInitialDataQuery();

  if (offersQuery.error || exchangeRatesQuery.error)
    return (
      'An error has occurred: ' + offersQuery.error?.message ||
      exchangeRatesQuery.error?.message
    );

  return (
    <>
      <MainWrapper>
        <Header />

        <section
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          {children}
        </section>
      </MainWrapper>
      <Footer />
    </>
  );
};
