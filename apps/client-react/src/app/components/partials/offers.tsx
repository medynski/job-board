import { CurrencyResponse, Offer } from '@job-board/api-interfaces';
import { UseQueryResult } from '@tanstack/react-query';
import { FunctionComponent } from 'react';
import { Box } from './box';
import { OfferBox } from './offer-box';
import { OfferBoxBlankSlate } from './offer-box-blank-slate';

export const Offers: FunctionComponent<{
  offersQuery: UseQueryResult<{ offers: Offer[] }>;
  exchangeRatesQuery: UseQueryResult<CurrencyResponse>;
  pageSize: string;
}> = ({ offersQuery, exchangeRatesQuery, pageSize }) => {
  return (
    <div>
      {offersQuery.isPending || exchangeRatesQuery.isPending ? (
        new Array(+pageSize)
          .fill(null)
          .map((_, index) => <OfferBoxBlankSlate key={index} />)
      ) : offersQuery.data!.offers.length === 0 ? (
        <Box>No offers found.</Box>
      ) : (
        offersQuery.data!.offers.map((offer: Offer, index: number) => (
          <OfferBox
            offer={offer}
            exchangeRates={exchangeRatesQuery.data!}
            key={index}
          />
        ))
      )}
    </div>
  );
};
