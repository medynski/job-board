import { CurrencyResponse } from '@job-board/api-interfaces';
import { formatCurrency } from './format-currency';

export const transformCurrency = (
  amount: number,
  currency: string,
  exchangeRates: CurrencyResponse
) => {
  let rate: number = amount;
  if (exchangeRates && currency !== 'pln') {
    switch (currency) {
      case 'usd':
        rate *= exchangeRates.rates.USD;
        break;
      case 'eur':
        rate *= exchangeRates.rates.EUR;
        break;
      case 'gbp':
        rate *= exchangeRates.rates.GBP;
        break;
    }
  }
  return formatCurrency(rate);
};
