export const OfferSchema = {
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
