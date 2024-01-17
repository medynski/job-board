import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyEnv, {
    schema: {
      type: 'object',
      required: ['MONGO_URL', 'MONGO_DB', 'API_KEY_EXCHANGERATESAPI'],
      properties: {
        MONGO_URL: {
          type: 'string',
          default: '',
        },
        MONGO_DB: {
          type: 'string',
          default: '',
        },
        API_KEY_EXCHANGERATESAPI: {
          type: 'string',
          default: '',
        },
      },
    },
    dotenv: true,
  });
});
