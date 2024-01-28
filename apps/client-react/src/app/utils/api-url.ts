export const apiUrl = (): string => {
  if (!import.meta.env.MODE || import.meta.env.MODE === 'development') {
    return 'http://localhost:3333/api';
  } else {
    return '/api';
  }
};
