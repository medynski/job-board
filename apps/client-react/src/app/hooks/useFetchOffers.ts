import { Offer } from '@job-board/api-interfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../utils/api-url';

export const useFetchOffers = () => {
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

  return { offers, setOffers };
};
