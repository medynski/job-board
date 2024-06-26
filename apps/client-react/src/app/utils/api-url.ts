export const apiBaseUrl = (): string => {
  if (!import.meta.env.MODE || import.meta.env.MODE === 'development') {
    return 'http://localhost:3000';
  } else {
    return '';
  }
};

export const apiUrl = (): string => {
  return `${apiBaseUrl()}/api`;
};
