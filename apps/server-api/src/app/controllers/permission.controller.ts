import { FastifyReply, FastifyRequest } from 'fastify';
import { getPermissions } from '../db/permissions';
import { PermissionsSchema } from '../schemas/permissions-schema';

const getUserPermissions = {
  schema: {
    response: {
      200: PermissionsSchema,
    },
  },
  handler: async (
    req: FastifyRequest<{ Params: { userId: string } }>,
    rep: FastifyReply
  ) => {
    const entry = await getPermissions(req.db, req.params.userId);
    rep.send(entry);
  },
};

export default {
  getUserPermissions,
};
