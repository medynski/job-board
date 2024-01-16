import { FastifyInstance } from 'fastify';
import OffersController from '../../controllers/offers.controller';

export default async function (fastify: FastifyInstance) {
  fastify.get('/offers', OffersController.getOffers);
  fastify.post('/offers', OffersController.postOffers);
  fastify.put('/offers', OffersController.putOffers);
  fastify.delete('/offers/:id', OffersController.deleteOffer);
}
