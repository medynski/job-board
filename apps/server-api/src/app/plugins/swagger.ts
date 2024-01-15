import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  const swaggerOptions = {
    swagger: {
      info: {
        title: 'Job board API',
        description: 'API endpoints documentation.',
        version: '1.0.0',
      },
      host: 'localhost',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [{ name: 'Default', description: 'Default' }],
    },
  };

  const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
  };

  fastify.register(fastifySwagger, swaggerOptions);
  fastify.register(fastifySwaggerUi, swaggerUiOptions);
});
