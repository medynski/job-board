import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Header } from './components/header';
import { OfferBox } from './components/offer-box';
import { apiUrl } from './utils/api-url';

const MainWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

export const App = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isOffersRequestPending,
    error: offersError,
    data: offers,
  } = useQuery({
    queryKey: ['offers'],
    queryFn: () => axios.get(`${apiUrl()}/offers`).then((res) => res.data),
  });

  const {
    isPending: isExchangeRatesRequestPending,
    error: exchangeRatesError,
    data: exchangeRates,
  } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: () =>
      axios.get(`${apiUrl()}/exchange-rates`).then((res) => res.data),
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

  if (isOffersRequestPending || isExchangeRatesRequestPending)
    return 'Loading...';

  if (offersError || exchangeRatesError)
    return (
      'An error has occurred: ' + offersError?.message ||
      exchangeRatesError?.message
    );

  console.log({ exchangeRates });

  return (
    <MainWrapper>
      <Header />

      {offers.map((offer: Offer, index: number) => (
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
    </MainWrapper>
  );
};

export default App;
