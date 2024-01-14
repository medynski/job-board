import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
    isPending,
    error,
    data: offers,
  } = useQuery({
    queryKey: ['offers'],
    queryFn: () =>
      fetch(`${apiUrl()}/offers`)
        .then((res) => res.json())
        .then((offers: Offer[]) =>
          offers.sort((a: Offer, b: Offer) => b.createdAt - a.createdAt)
        ),
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

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

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
