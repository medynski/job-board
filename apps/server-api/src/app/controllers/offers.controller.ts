import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllOffers, getFirstOffer } from '../db/offer';
import { OfferSchema } from '../schemas/offer-schema';

const getOffers = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: OfferSchema,
      },
    },
  },
  handler: async (_, rep: FastifyReply) => {
    const offersData = await getAllOffers();
    rep.send(offersData);
  },
};

const postOffers = {
  schema: {
    response: {
      201: OfferSchema,
    },
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
      },
    },
  },
  handler: async (req: FastifyRequest, rep: FastifyReply) => {
    const offer = req.body;
    console.warn(offer);

    const response = await getFirstOffer();
    rep.code(201).send(response);
  },
};

const putOffers = {
  schema: {
    response: {
      201: OfferSchema,
    },
    body: OfferSchema,
  },
  handler: async (req: FastifyRequest, rep: FastifyReply) => {
    const offer = req.body;
    console.warn(offer);

    const response = await getFirstOffer();
    rep.code(201).send(response);
  },
};

const deleteOffer = {
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
    req: FastifyRequest<{ Params: { id: string } }>,
    rep: FastifyReply
  ) => {
    const id = req.params.id;
    const offer = req.body;
    console.warn(offer, id);

    rep.send('The offer has been deleted.');
  },
};

export default {
  postOffers,
  putOffers,
  getOffers,
  deleteOffer,
};
