import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { FunctionComponent } from 'react';

const Box = styled.div`
  background-color: pink;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
`;

export const OfferBox: FunctionComponent<{ offer: Offer }> = (props) => {
  return <Box>{props.offer.title}</Box>;
};
