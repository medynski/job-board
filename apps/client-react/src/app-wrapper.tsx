import { Global, ThemeProvider, css } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { grey } from '@mui/material/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FunctionComponent, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/app';
import { useSearchParams } from './app/hooks/useSearchParams';
import {
  SearchParamsContext,
  createSearchParamsStore,
} from './app/state/useSearchParamsStore';
import { theme } from './app/theme';

const queryClient = new QueryClient();

export const AppContextWrapper: FunctionComponent = () => {
  const { page, search } = useSearchParams();
  const store = useRef(
    createSearchParamsStore({ page, search, currentSearch: search })
  ).current;

  return (
    <SearchParamsContext.Provider value={store}>
      <Global
        styles={css`
          * {
            font-family: 'Roboto', sans-serif;
            color: ${grey[900]};
          }
        `}
      />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>

          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </SearchParamsContext.Provider>
  );
};

export const AppWrapper: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <AppContextWrapper />
    </BrowserRouter>
  );
};
