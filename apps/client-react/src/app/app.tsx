import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { Header } from './components/header';
import { OfferBox } from './components/offer-box';
import { Pagination } from './components/pagination';
import { useQueryParams } from './hooks/useQueryParams';
import { apiUrl } from './utils/api-url';

const MainWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const pageSize = 10;

export const App: FunctionComponent = () => {
  const { page } = useQueryParams();

  const [offersQuery, exchangeRatesQuery] = useQueries({
    queries: [
      {
        queryKey: ['offers', page],
        queryFn: () =>
          axios
            .get(`${apiUrl()}/offers?pageSize=${pageSize}&page=${page}`)
            .then((res) => res.data),
      },
      {
        queryKey: ['exchangeRates'],
        queryFn: () =>
          axios.get(`${apiUrl()}/exchange-rates`).then((res) => res.data),
      },
    ],
  });

  if (offersQuery.isPending || exchangeRatesQuery.isPending)
    return 'Loading...';

  if (offersQuery.error || exchangeRatesQuery.error)
    return (
      'An error has occurred: ' + offersQuery.error?.message ||
      exchangeRatesQuery.error?.message
    );

  return (
    <MainWrapper>
      <Header />

      {offersQuery.data.offers.map((offer: Offer, index: number) => (
        <OfferBox offer={offer} key={index} />
      ))}
      <Pagination totalPages={offersQuery.data.pages.totalPages} />
    </MainWrapper>
  );
};

export default App;
