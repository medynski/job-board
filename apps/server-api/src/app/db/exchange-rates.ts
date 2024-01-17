import { CurrencyResponse } from '@job-board/api-interfaces';
import { Datastore } from 'nedb-async-await';
import path from 'path';

const exchangeRatesCollection = Datastore({
  filename: path.resolve(path.dirname(''), './database/exchange-rates.db'),
  autoload: true,
});

export const getCurrentExchangeRates = async (): Promise<
  CurrencyResponse[]
> => {
  //   const entryData = await exchangeRatesCollection
  //     .find()
  //     .sort({ timestamp: -1 })
  //     .limit(1);

  const entryData = await exchangeRatesCollection.find({});
  return entryData.reverse()[0];
};

export const addExchangeRates = async (
  entry: CurrencyResponse
): Promise<void> => {
  await exchangeRatesCollection.insert(entry);
};
