import { Global, ThemeProvider, css } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Favorites } from './app/components/pages/favorites';
import { Home } from './app/components/pages/home';
import { CustomSnackbar } from './app/components/partials/custom-snackbar';
import { useSearchParams } from './app/hooks/useSearchParams';
import { SearchParamsStoreProvider } from './app/state/SearchParamsStoreContext';
import { theme } from './app/theme';
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';

const queryClient = new QueryClient();

export const AppContextWrapper: FunctionComponent = () => {
  const { page, search } = useSearchParams();

  return (
    <SearchParamsStoreProvider
      page={page}
      search={search}
      currentSearch={search}
      hasSearchParamsChanged={search !== ''}
    >
      <Global
        styles={css`
          * {
            font-family: 'Roboto', sans-serif;
            color: #000;
            box-sizing: border-box;
          }
        `}
      />
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>

            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </StyledEngineProvider>
      <CustomSnackbar />
    </SearchParamsStoreProvider>
  );
};

export const AppWrapper: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <AppContextWrapper />
    </BrowserRouter>
  );
};
