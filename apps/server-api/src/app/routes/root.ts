import { FastifyInstance } from 'fastify';
import { Datastore } from 'nedb-async-await';
import * as path from 'path';

const offers = Datastore({
  filename: path.resolve(path.dirname(''), './database/offers.db'),
  autoload: true,
});

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return { message: 'Hello API' };
  });

  fastify.get('/offers', async () => {
    const offersData = await offers.find({});
    return offersData;
  });
}
