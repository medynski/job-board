import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();

    const { baseElement } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
