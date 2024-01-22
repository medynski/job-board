import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useState } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { OfferBox } from './components/offer-box';
import { OfferBoxBlankSlate } from './components/offer-box-blank-slate';
import { useDebounceValue } from './hooks/useDebounceValue';
import { useQueryParams } from './hooks/useQueryParams';
import { apiUrl } from './utils/api-url';

const MainWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const pageSize = 10;

export const App: FunctionComponent = () => {
  const { page } = useQueryParams();
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounceValue(search);

  const [offersQuery, exchangeRatesQuery] = useQueries({
    queries: [
      {
        queryKey: ['offers', page, debounceSearch],
        queryFn: () => {
          return axios
            .get(
              `${apiUrl()}/offers?pageSize=${pageSize}&page=${page}&search=${debounceSearch}`
            )
            .then((res) => res.data);
        },
      },
      {
        queryKey: ['exchangeRates'],
        queryFn: () =>
          axios.get(`${apiUrl()}/exchange-rates`).then((res) => res.data),
      },
    ],
  });

  if (offersQuery.error || exchangeRatesQuery.error)
    return (
      'An error has occurred: ' + offersQuery.error?.message ||
      exchangeRatesQuery.error?.message
    );

  return (
    <MainWrapper>
      <Header />

      <input type="text" onChange={(e) => setSearch(e.target.value)} />

      {offersQuery.isPending || exchangeRatesQuery.isPending ? (
        new Array(pageSize)
          .fill(null)
          .map((_, index) => <OfferBoxBlankSlate key={index} />)
      ) : (
        <>
          <section>
            {offersQuery.data.offers.map((offer: Offer, index: number) => (
              <OfferBox
                offer={offer}
                exchangeRates={exchangeRatesQuery.data}
                key={index}
              />
            ))}
          </section>
          <Footer totalPages={offersQuery.data.pages.totalPages} page={page} />
        </>
      )}
    </MainWrapper>
  );
};

export default App;
