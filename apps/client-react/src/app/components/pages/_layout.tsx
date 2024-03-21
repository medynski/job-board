import { FunctionComponent, PropsWithChildren } from 'react';
import { useInitialDataQuery } from '../../hooks/queries/useInitialDataQuery';
import { Footer } from '../partials/footer';
import { Header } from '../partials/header';

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { offersQuery, exchangeRatesQuery } = useInitialDataQuery();

  if (offersQuery.error || exchangeRatesQuery.error)
    return (
      'An error has occurred: ' + offersQuery.error?.message ||
      exchangeRatesQuery.error?.message
    );

  return (
    <div className="container mx-auto relative">
      <Header />
      <main className="flex flex-col pb-10">{children}</main>
      <Footer />
    </div>
  );
};
