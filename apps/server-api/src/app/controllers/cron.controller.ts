import { FastifyReply, FastifyRequest } from 'fastify';
import {
  cleanDuplicatedOffers,
  cleanSimilarOffers,
} from '../db/migrations/offers';
import { fetchExchangeRates } from '../util/fetch/exchange-rates';
import { fetchJJIT } from '../util/fetch/offers/jjit';
import { fetchNFJ } from '../util/fetch/offers/nfj';

const getFetchNFJ = async (_: FastifyRequest, reply: FastifyReply) => {
  const count = await fetchNFJ(_.db);
  cleanSimilarOffers(_.db);
  cleanDuplicatedOffers(_.db);
  reply.send(`DB updated by adding ${count} offers.`);
};

const getFetchJJIT = async (_: FastifyRequest, reply: FastifyReply) => {
  const count = await fetchJJIT(_.db);
  // sortRequiredSkills(_.db);
  cleanSimilarOffers(_.db);
  cleanDuplicatedOffers(_.db);
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
