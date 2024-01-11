export const currency = (amount: number) => {
  return new Intl.NumberFormat('pl-PL', { maximumSignificantDigits: 3 }).format(
    amount
  );
};
