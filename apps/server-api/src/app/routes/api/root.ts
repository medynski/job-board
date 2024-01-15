import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { offers } from '../../util/db';

const OfferSchema = {
  type: 'object',
  properties: {
    uniqId: { type: 'string' },
    title: { type: 'string' },
    createdAt: { type: 'number' },
    companyName: { type: 'string' },
    salaryRange: {
      type: 'object',
      properties: {
        from: { type: 'number' },
        to: { type: 'number' },
      },
    },
    url: { type: 'string' },
    requiredSkills: { type: 'array', items: { type: 'string' } },
    origin: { type: 'string' },
    seniority: { type: 'array', items: { type: 'string' } },
    companyLogoUrl: { type: 'string' },
    currency: { type: 'string' },
    _id: { type: 'string' },
  },
};

const getFirstOffer = async () => {
  const offersData = await offers.find({});
  return offersData[0];
};

export default async function (fastify: FastifyInstance) {
  fastify.get('/offers', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: OfferSchema,
        },
      },
    },
    handler: async (_, rep: FastifyReply) => {
      const offersData = await offers.find({});
      rep.send(offersData);
    },
  });

  fastify.post('/offers', {
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
  });

  fastify.put('/offers', {
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
  });

  fastify.delete('/offers/:id', {
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
  });
}
