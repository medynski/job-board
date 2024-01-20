import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Header } from './components/header';
import { OfferBox } from './components/offer-box';
import { apiUrl } from './utils/api-url';

const MainWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const pageSize = 10;

export const App = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

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

  const { mutateAsync: addOffer } = useMutation({
    mutationFn: async (offer: Partial<Offer>) => {
      return offer;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  if (offersQuery.isPending || exchangeRatesQuery.isPending)
    return 'Loading...';

  if (offersQuery.error || exchangeRatesQuery.error)
    return (
      'An error has occurred: ' + offersQuery.error?.message ||
      exchangeRatesQuery.error?.message
    );

  console.log({ a: exchangeRatesQuery.data, b: offersQuery.data });

  return (
    <MainWrapper>
      <Header />

      {offersQuery.data.offers.map((offer: Offer, index: number) => (
        <OfferBox offer={offer} key={index} />
      ))}

      <div
        css={css`
          display: none;
        `}
      >
        <button onClick={async () => addOffer({ title: 'New offer' })}>
          Add new offer
        </button>
      </div>

      <nav>
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span
          css={css`
            display: inline-block;
            margin-right: 20px;
            margin-left: 20px;
          `}
        >
          {page}
        </span>
        <button
          onClick={() =>
            setPage(Math.min(page + 1, offersQuery.data.pages.totalPages))
          }
          disabled={page === offersQuery.data.pages.totalPages}
        >
          Next
        </button>
      </nav>
    </MainWrapper>
  );
};

export default App;
