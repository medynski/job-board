import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import path from 'path';
import { app } from './app/app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});
server.register(cors, {});

// serve static app
server.register(fastifyStatic, {
  root: path.resolve(path.dirname(''), './dist/apps/client-react'),
});

server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
