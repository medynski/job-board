export const PermissionsSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    role: { type: 'string' },
    _id: { type: 'string' },
  },
};
