import { FastifyReply, FastifyRequest } from 'fastify';
import { fetchExchangeRates } from '../util/fetch/exchange-rates';
import { fetchJJIT } from '../util/fetch/jjit';
import { fetchNFJ } from '../util/fetch/nfj';

const getFetchNFJ = async (_: FastifyRequest, reply: FastifyReply) => {
  const response = await fetchNFJ();
  reply.send(response);
};

const getFetchJJIT = async (_: FastifyRequest, reply: FastifyReply) => {
  await fetchJJIT(_.db);
  reply.send('DB updated.');
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
