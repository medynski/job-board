import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OfferBox } from './offer-box';
import { apiUrl } from './utils/api-url';

const MainWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Divider = styled.div`
  width: 70%;
  margin: 20px auto;
  background-color: #000;
  height: 10px;
`;

export const App = () => {
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    data: offers,
  } = useQuery({
    queryKey: ['offers'],
    queryFn: () => fetch(`${apiUrl()}/offers`).then((res) => res.json()),
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
      {offers
        .sort((a: Offer, b: Offer) => b.createdAt - a.createdAt)
        .map((offer: Offer, index: number) => (
          <OfferBox offer={offer} key={index} />
        ))}

      <div
        css={css`
          display: none;
        `}
      >
        <Divider />

        <button onClick={async () => addOffer({ title: 'New offer' })}>
          Add new offer
        </button>
      </div>
    </MainWrapper>
  );
};

export default App;
