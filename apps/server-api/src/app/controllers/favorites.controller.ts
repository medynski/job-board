import { FastifyReply, FastifyRequest } from 'fastify';
import {
  addFavorite,
  deleteSelectedFavorite,
  getAllFavorites,
} from '../db/favorites';
import { OfferSchema } from '../schemas/offer-schema';

const getFavorites = {
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
      required: ['userId', 'uniqOfferId'],
      properties: {
        userId: { type: 'string' },
        uniqOfferId: { type: 'string' },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{ Body: { userId: string; uniqOfferId: string } }>,
    rep: FastifyReply
  ) => {
    const { userId, uniqOfferId } = req.body;
    await addFavorite(req.db, userId, uniqOfferId);
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
    body: {
      type: 'object',
      required: ['userId', 'uniqOfferId'],
      properties: {
        userId: { type: 'string' },
        uniqOfferId: { type: 'string' },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{ Body: { userId: string; uniqOfferId: string } }>,
    rep: FastifyReply
  ) => {
    const { userId, uniqOfferId } = req.body;
    await deleteSelectedFavorite(req.db, userId, uniqOfferId);
    rep.send('The offer has been deleted.');
  },
};

export default {
  getFavorites,
  deleteFavorite,
  postFavorite,
};
