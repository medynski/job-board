import { Offer } from '@job-board/api-interfaces';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { OfferBox } from './offer-box';

export const App = () => {
  const [data, setData] = useState<Offer[]>([]);

  useEffect(() => {
    axios
      .get<Offer[]>('http://localhost:3333/offers')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }, []);

  return (
    <Fragment>
      {data.map((offer) => (
        <OfferBox offer={offer} />
      ))}
    </Fragment>
  );
};

export default App;
