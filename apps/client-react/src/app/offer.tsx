import { Offer } from "@job-board/api-interfaces";
import { FunctionComponent } from "react";
import styled from '@emotion/styled';

const Box = styled.div`
    background-color: red;
`;

export const OfferBox: FunctionComponent<{ offer: Offer }> = (props) => {
    return <Box>{props.offer.title}</Box>;
}