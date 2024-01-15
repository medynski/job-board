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

const offersOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: OfferSchema,
      },
    },
  },
};

const postOffersOptions = {
  schema: {
    response: {
      201: OfferSchema,
    },
  },
};

const deleteOffersOptions = {
  schema: {
    response: {
      201: OfferSchema,
    },
  },
};

const getFirstOffer = async () => {
  const offersData = await offers.find({});
  return offersData[0];
};

export default async function (fastify: FastifyInstance, rep: FastifyReply) {
  fastify.get('/offers', offersOptions, async () => {
    const offersData = await offers.find({});
    rep.send(offersData);
  });

  fastify.post(
    '/offers',
    postOffersOptions,
    async (req: FastifyRequest, rep: FastifyReply) => {
      const offer = req.body;
      console.warn(offer);
      const response = await getFirstOffer();
      rep.send(response);
    }
  );

  fastify.delete(
    '/offers/:id',
    deleteOffersOptions,
    async (
      req: FastifyRequest<{ Params: { id: string } }>,
      rep: FastifyReply
    ) => {
      const id = req.params.id;
      const offer = req.body;
      console.warn(offer, id);
      const response = await getFirstOffer();
      rep.send(response);
    }
  );
}
