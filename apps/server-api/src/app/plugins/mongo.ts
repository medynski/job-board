import fastifyMongodb from '@fastify/mongodb';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyMongodb, {
    forceClose: true,
    url: fastify.config.MONGO_URL,
    database: fastify.config.MONGO_DB,
  });
});
