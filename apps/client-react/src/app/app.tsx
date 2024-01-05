import { Offer } from '@job-board/api-interfaces';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { OfferBox } from './offer-box';
import { Query } from './query';
import { apiUrl } from './utils/api-url';

export const App = () => {
  const [data, setData] = useState<Offer[]>([]);

  useEffect(() => {
    axios
      .get<Offer[]>(`${apiUrl()}/offers`)
      .then((response) => {
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
      {data.map((offer, index) => (
        <OfferBox offer={offer} key={index} />
      ))}

      <Query />
    </Fragment>
  );
};

export default App;
