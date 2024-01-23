import { SearchParams } from '@job-board/api-interfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllOffers, getOffersCount } from '../db/offer';
import { OfferSchema } from '../schemas/offer-schema';
import { PagesSchema } from '../schemas/pages-schema';
import { mockSlowConnection } from '../util/mock-slow-connection';

const getOffers = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          offers: {
            type: 'array',
            items: OfferSchema,
          },
          pages: PagesSchema,
        },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{
      Querystring: SearchParams;
    }>,
    rep: FastifyReply
  ) => {
    const { page = '1', pageSize = '10', search = '' } = req.query;
    const pageSizeInt = parseInt(pageSize, 10);
    const offersCount = await getOffersCount(req.db, search);
    const offersData = await getAllOffers(
      req.db,
      parseInt(page, 10),
      pageSizeInt,
      search
    );
    mockSlowConnection(500);

    rep.send({
      offers: offersData,
      pages: {
        page,
        pageSize,
        totalPages: Math.ceil(offersCount / pageSizeInt),
      },
    });
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

    const response = await getAllOffers(req.db);
    rep.code(201).send(response[0]);
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

    const response = await getAllOffers(req.db);
    rep.code(201).send(response[0]);
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
