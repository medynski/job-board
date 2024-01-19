import { FastifyReply, FastifyRequest } from 'fastify';
import { getCurrentExchangeRates } from '../db/exchange-rates';
import { ExchangeRatesSchema } from '../schemas/exchange-rates-schema';

const getExchangeRates = {
  schema: {
    response: {
      200: ExchangeRatesSchema,
    },
  },
  handler: async (req: FastifyRequest, rep: FastifyReply) => {
    const exchangeRates = await getCurrentExchangeRates(req.db);
    rep.send(exchangeRates);
  },
};

export default {
  getExchangeRates,
};
