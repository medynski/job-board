import { FastifyInstance } from 'fastify';
import CronController from './../../controllers/cron.controller';

export default async function (fastify: FastifyInstance) {
  fastify.get('/fetch-jjit', CronController.getFetchJJIT);
  fastify.get('/fetch-nfj', CronController.getFetchNFJ);
  fastify.get('/fetch-tp', CronController.getFetchTP);
  fastify.get('/fetch-exchange-rates', CronController.getExchangeRates);
}
