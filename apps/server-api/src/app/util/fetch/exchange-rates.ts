import { CurrencyResponse } from '@job-board/api-interfaces';
import 'dotenv/config';
import { Db } from 'mongodb';
import { addExchangeRates } from '../../db/exchange-rates';

export const fetchExchangeRates = async (db: Db) => {
  const response = (await fetch(
    `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.API_KEY_EXCHANGERATESAPI}`
  ).then((resp) => resp.json())) as CurrencyResponse;

  await addExchangeRates(db, response);

  return response;
};
