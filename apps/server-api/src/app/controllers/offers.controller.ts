import { SearchParams } from '@job-board/api-interfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifySchema } from 'fastify/types/schema';
import { getAllOffers } from '../db/offer';
import { OfferSchema } from '../schemas/offer-schema';
import { PagesSchema } from '../schemas/pages-schema';
import { mockSlowConnection } from '../util/mock-slow-connection';

const getOffers: {
  schema: FastifySchema;
  handler: (req: FastifyRequest, rep: FastifyReply) => void;
} = {
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
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'string' },
        pageSize: { type: 'string' },
        search: { type: 'string' },
        salaryRangeFrom: { type: 'string' },
        salaryRangeTo: { type: 'string' },
        createDateFrom: { type: 'string' },
        createDateTo: { type: 'string' },
        requiredSkills: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  handler: async (
    req: FastifyRequest<{
      Querystring: SearchParams;
    }>,
    rep: FastifyReply
  ) => {
    const {
      page = '1',
      pageSize = '10',
      search = '',
      salaryRangeFrom = null,
      salaryRangeTo = null,
      createDateFrom = null,
      createDateTo = null,
      requiredSkills = null,
    } = req.query;
    const pageSizeInt = parseInt(pageSize, 10);
    const offersData = await getAllOffers(
      req.db,
      parseInt(page, 10),
      pageSizeInt,
      search,
      salaryRangeFrom !== null ? parseInt(salaryRangeFrom, 10) : null,
      salaryRangeTo !== null ? parseInt(salaryRangeTo, 10) : null,
      createDateFrom !== null ? parseInt(createDateFrom, 10) : null,
      createDateTo !== null ? parseInt(createDateTo, 10) : null,
      requiredSkills !== null ? requiredSkills.split(',') : null
    );
    mockSlowConnection(500);

    rep.send({
      offers: offersData.results,
      pages: {
        page,
        pageSize,
        totalPages: Math.ceil(offersData.count / pageSizeInt),
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
