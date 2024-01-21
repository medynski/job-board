import { CurrencyResponse } from '@job-board/api-interfaces';

export const exchangeRatesMapper = (exchangeRates: CurrencyResponse) => {
  return {
    success: exchangeRates.success,
    timestamp: exchangeRates.timestamp,
    base: 'PLN',
    date: exchangeRates.date,
    rates: {
      USD: (1 / exchangeRates.rates.USD) * exchangeRates.rates.PLN,
      GBP: (1 / exchangeRates.rates.GBP) * exchangeRates.rates.PLN,
      EUR: exchangeRates.rates.PLN,
    },
  };
};
