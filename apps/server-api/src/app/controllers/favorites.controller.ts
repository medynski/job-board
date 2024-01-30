import { FastifyReply, FastifyRequest } from 'fastify';
import {
  addFavorite,
  deleteSelectedFavorite,
  getAllFavorites,
  getFavoritesCount,
} from '../db/favorites';
import { OfferSchema } from '../schemas/offer-schema';

const postGetAllFavorites = {
  schema: {
    body: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: { offers: { type: 'array', items: OfferSchema } },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{ Body: { userId: string } }>,
    rep: FastifyReply
  ) => {
    const { userId } = req.body;

    const response = await getAllFavorites(req.db, userId);
    rep.send({ offers: response });
  },
};

const postGetFavoritesCount = {
  schema: {
    body: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: { count: { type: 'number' } },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{ Body: { userId: string } }>,
    rep: FastifyReply
  ) => {
    const { userId } = req.body;

    const response = await getFavoritesCount(req.db, userId);
    rep.send({ count: response });
  },
};

const postFavorite = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    body: {
      type: 'object',
      required: ['userId', 'offerUniqId'],
      properties: {
        userId: { type: 'string' },
        offerUniqId: { type: 'string' },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{ Body: { userId: string; offerUniqId: string } }>,
    rep: FastifyReply
  ) => {
    const { userId, offerUniqId } = req.body;
    await addFavorite(req.db, userId, offerUniqId);
    rep.send('Favorite has been added');
  },
};

const deleteFavorite = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{ Params: { userId: string; uniqOfferId: string } }>,
    rep: FastifyReply
  ) => {
    const { userId, uniqOfferId } = req.params;
    await deleteSelectedFavorite(req.db, userId, uniqOfferId);
    rep.send('The offer has been deleted.');
  },
};

export default {
  deleteFavorite,
  postFavorite,
  postGetAllFavorites,
  postGetFavoritesCount,
};
