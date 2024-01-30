import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/home';
import { SearchParamsStoreProvider } from './state/SearchParamsStoreContext';

describe('App', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();

    const { baseElement } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SearchParamsStoreProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </SearchParamsStoreProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
