import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { FunctionComponent } from 'react';

const Box = styled.div`
  background-color: pink;
`;

export const OfferBox: FunctionComponent<{ offer: Offer }> = (props) => {
  return <Box>{props.offer.title}</Box>;
};
