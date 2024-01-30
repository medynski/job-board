import fastifyStatic from '@fastify/static';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import path from 'path';

export default fp(async function (fastify: FastifyInstance) {
  // serve static app
  fastify.register(fastifyStatic, {
    root: path.resolve(path.dirname(''), './dist/apps/client-react'),
    wildcard: false, // set this to false to disable wildcard for static routes
  });
});
