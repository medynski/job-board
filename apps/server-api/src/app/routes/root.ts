import { FastifyInstance } from 'fastify';
import * as path from 'path';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async (req, reply) => {
    return reply.sendFile(
      'index.html',
      path.resolve(__dirname, './../../../../../../client-react')
    );
  });
}
