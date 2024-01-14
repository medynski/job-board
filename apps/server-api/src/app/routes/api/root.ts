import { FastifyInstance } from 'fastify';
import { Datastore } from 'nedb-async-await';
import * as path from 'path';

const offers = Datastore({
  filename: path.resolve(path.dirname(''), './database/offers.db'),
  autoload: true,
});

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

export default async function (fastify: FastifyInstance) {
  fastify.get('/offers', offersOptions, async () => {
    const offersData = await offers.find({});
    return offersData;
  });
}
