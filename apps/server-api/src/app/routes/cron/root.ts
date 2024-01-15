import { FastifyInstance, FastifyReply } from 'fastify';
import { fetchJJIT } from '../../util/fetch/jjit';
import { fetchNFJ } from '../../util/fetch/nfj';

export default async function (fastify: FastifyInstance) {
  fastify.get('/fetch-jjit', async (_, reply: FastifyReply) => {
    await fetchJJIT();
    reply.send('DB updated.');
  });

  fastify.get('/fetch-nfj', async (_, reply: FastifyReply) => {
    const response = await fetchNFJ();
    reply.send(response);
  });
}
