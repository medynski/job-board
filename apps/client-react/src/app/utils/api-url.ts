export const apiUrl = (): string => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:3333';
  } else {
    return '';
  }
};
