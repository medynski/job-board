import AutoLoad from '@fastify/autoload';
import { FastifyInstance } from 'fastify';
import * as path from 'path';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // Place here your custom code!
  fastify.decorateRequest('db', null);
  fastify.addHook('onRequest', async (req) => {
    req.db = fastify.mongo.db;
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
}
