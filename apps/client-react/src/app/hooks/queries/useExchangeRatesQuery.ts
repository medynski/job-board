import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../../utils/api-url';

export const useExchangeRatesQuery = () => {
  const exchangeRates = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: () =>
      axios.get(`${apiUrl()}/exchange-rates`).then((res) => res.data),
  });

  return { exchangeRates };
};
