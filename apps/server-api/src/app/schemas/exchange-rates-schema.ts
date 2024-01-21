export const ExchangeRatesSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    timestamp: { type: 'number' },
    base: { type: 'string' },
    date: { type: 'string' },
    rates: {
      type: 'object',
      properties: {
        PLN: { type: 'number' },
        USD: { type: 'number' },
        GBP: { type: 'number' },
        EUR: { type: 'number' },
      },
    },
    _id: { type: 'string' },
  },
};
