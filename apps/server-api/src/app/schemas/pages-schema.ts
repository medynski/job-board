export const PagesSchema = {
  type: 'object',
  properties: {
    page: { type: 'number' },
    pageSize: { type: 'number' },
    totalPages: { type: 'number' },
  },
};
