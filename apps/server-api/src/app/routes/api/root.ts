import { FastifyInstance } from 'fastify';
import ExchangeRatesController from '../../controllers/exchange-rates.controller';
import FavoritesController from '../../controllers/favorites.controller';
import OffersController from '../../controllers/offers.controller';

export default async function (fastify: FastifyInstance) {
  fastify.get('/exchange-rates', ExchangeRatesController.getExchangeRates);

  fastify.get('/offers', OffersController.getOffers);
  fastify.post('/offers', OffersController.postOffers);
  fastify.put('/offers', OffersController.putOffers);
  fastify.delete('/offers/:id', OffersController.deleteOffer);

  fastify.get(
    '/favorites/count/:userId',
    FavoritesController.getFavoritesCount
  );
  fastify.get('/favorites/:userId', FavoritesController.getAllFavorites);
  fastify.post('/favorites/add', FavoritesController.postFavorite);
  fastify.delete(
    '/favorites/:userId/:uniqOfferId',
    FavoritesController.deleteFavorite
  );
}
