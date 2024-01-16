import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getAllOffers, getFirstOffer } from '../../db/offer';
import { OfferSchema } from '../../schemas/offer-schema';

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
      const offersData = await getAllOffers();
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
