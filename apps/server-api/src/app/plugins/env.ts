import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyEnv, {
    schema: {
      type: 'object',
      required: [
        'MONGO_URL',
        'MONGO_DB',
        'API_KEY_EXCHANGERATESAPI',
        'OFFERS_JJIT_URL',
        'OFFERS_NFJ_URL',
      ],
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
        OFFERS_JJIT_URL: {
          type: 'string',
          default: '',
        },
        OFFERS_NFJ_URL: {
          type: 'string',
          default: '',
        },
      },
    },
    dotenv: true,
  });
});
