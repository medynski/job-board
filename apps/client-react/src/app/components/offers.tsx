import { Offer } from '@job-board/api-interfaces';
import { FunctionComponent } from 'react';
import { OfferBox } from './../components/offer-box';
import { OfferBoxBlankSlate } from './../components/offer-box-blank-slate';
import { useInitialDataHandler } from './../hooks/useInitialDataHandler';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from './../state/useSearchParamsStore';

export const Offers: FunctionComponent = () => {
  const { offersQuery, exchangeRatesQuery } = useInitialDataHandler();
  const pageSize = useSearchParamsStore(
    (state: SearchParamsStore) => state.pageSize
  );

  return (
    <div>
      {offersQuery.isPending || exchangeRatesQuery.isPending
        ? new Array(+pageSize)
            .fill(null)
            .map((_, index) => <OfferBoxBlankSlate key={index} />)
        : offersQuery.data.offers.map((offer: Offer, index: number) => (
            <OfferBox
              offer={offer}
              exchangeRates={exchangeRatesQuery.data}
              key={index}
            />
          ))}
    </div>
  );
};
