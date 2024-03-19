import Fastify from 'fastify';
import { Db } from 'mongodb';
import { app } from './app/app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

declare module 'fastify' {
  interface FastifyRequest {
    db: Db;
  }

  interface FastifyInstance {
    config: {
      MONGO_URL: string;
      MONGO_DB: string;
      API_KEY_EXCHANGERATESAPI: string;
    };
  }
}

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

server.register(app);

const PhusionPassenger: unknown = {};

// Start listening.
if (typeof PhusionPassenger !== 'undefined') {
  server.listen({ path: 'passenger', host: '127.0.0.1' });
} else {
  server.listen({ port, host }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${host}:${port}`);
    }
  });
}
