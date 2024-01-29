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
      required: ['email'],
      properties: {
        email: { type: 'string' },
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
    req: FastifyRequest<{ Body: { email: string } }>,
    rep: FastifyReply
  ) => {
    const { email } = req.body;
    console.warn(email);

    const response = await getAllFavorites(req.db, email);
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
      required: ['email', 'uniqOfferId'],
      properties: {
        email: { type: 'string' },
        uniqOfferId: { type: 'string' },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{ Body: { email: string; uniqOfferId: string } }>,
    rep: FastifyReply
  ) => {
    const { email, uniqOfferId } = req.body;
    await addFavorite(req.db, email, uniqOfferId);
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
      required: ['email', 'uniqOfferId'],
      properties: {
        email: { type: 'string' },
        uniqOfferId: { type: 'string' },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{ Body: { email: string; uniqOfferId: string } }>,
    rep: FastifyReply
  ) => {
    const { email, uniqOfferId } = req.body;
    await deleteSelectedFavorite(req.db, email, uniqOfferId);
    rep.send('The offer has been deleted.');
  },
};

export default {
  getFavorites,
  deleteFavorite,
  postFavorite,
};
