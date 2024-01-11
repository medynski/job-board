import { Offer } from '@job-board/api-interfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OfferBox } from './offer-box';
import { Query } from './query';
import { apiUrl } from './utils/api-url';

export const App = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Offer[]>(`${apiUrl()}/offers`);
        setOffers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {offers.map((offer, index) => (
        <OfferBox offer={offer} key={index} />
      ))}
      <Query />
    </>
  );
};

export default App;
