export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pl-PL', { maximumSignificantDigits: 3 }).format(
    amount
  );
};
