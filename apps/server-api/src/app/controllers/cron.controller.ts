import { FastifyReply, FastifyRequest } from 'fastify';
import { cleanSimilarOffers } from '../db/migrations/offers';
import { fetchExchangeRates } from '../util/fetch/exchange-rates';
import { fetchJJIT } from '../util/fetch/jjit';
import { fetchNFJ } from '../util/fetch/nfj';

const getFetchNFJ = async (_: FastifyRequest, reply: FastifyReply) => {
  const count = await fetchNFJ(_.db);
  reply.send(`DB updated by adding ${count} offers.`);
};

const getFetchJJIT = async (_: FastifyRequest, reply: FastifyReply) => {
  const count = await fetchJJIT(_.db);
  // sortRequiredSkills(_.db);
  cleanSimilarOffers(_.db);
  reply.send(`DB updated by adding ${count} offers.`);
};

const getExchangeRates = async (_: FastifyRequest, reply: FastifyReply) => {
  await fetchExchangeRates(_.db);
  reply.send('DB updated.');
};

export default {
  getFetchNFJ,
  getFetchJJIT,
  getExchangeRates,
};
