import { FastifyReply, FastifyRequest } from 'fastify';
import { fetchJJIT } from '../util/fetch/jjit';
import { fetchNFJ } from '../util/fetch/nfj';

const getFetchNFJ = async (_: FastifyRequest, reply: FastifyReply) => {
  const response = await fetchNFJ();
  reply.send(response);
};

const getFetchJJIT = async (_: FastifyRequest, reply: FastifyReply) => {
  await fetchJJIT();
  reply.send('DB updated.');
};

export default {
  getFetchNFJ,
  getFetchJJIT,
};
