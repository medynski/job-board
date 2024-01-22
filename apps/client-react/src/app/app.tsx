import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { OfferBox } from './components/offer-box';
import { OfferBoxBlankSlate } from './components/offer-box-blank-slate';
import { useDebounceValue } from './hooks/useDebounceValue';
import { useQueryParams } from './hooks/useQueryParams';
import { apiUrl } from './utils/api-url';

const MainWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const pageSize = 10;

export const App: FunctionComponent = () => {
  const navigate = useNavigate();
  const { page, search } = useQueryParams();
  const [currentFilters, setCurrentFilters] = useState<{
    page: number;
    search: string;
  }>({ page, search });
  const debounceFilters = useDebounceValue(currentFilters);

  useEffect(() => {
    navigate(
      `/?page=${debounceFilters.page}${
        debounceFilters.search ? `&search=${debounceFilters.search}` : ''
      }`
    );
  }, [debounceFilters, navigate]);

  const [offersQuery, exchangeRatesQuery] = useQueries({
    queries: [
      {
        queryKey: ['offers', debounceFilters.page, debounceFilters.search],
        queryFn: () => {
          return axios
            .get(
              `${apiUrl()}/offers?pageSize=${pageSize}&page=${
                debounceFilters.page
              }&search=${debounceFilters.search}`
            )
            .then((res) => res.data);
        },
      },
      {
        queryKey: ['exchangeRates'],
        queryFn: () =>
          axios.get(`${apiUrl()}/exchange-rates`).then((res) => res.data),
      },
    ],
  });

  const handleSearchPhrase = (newSearchPhrase: string) => {
    setCurrentFilters({ page: 1, search: newSearchPhrase });
  };

  if (offersQuery.error || exchangeRatesQuery.error)
    return (
      'An error has occurred: ' + offersQuery.error?.message ||
      exchangeRatesQuery.error?.message
    );

  return (
    <MainWrapper>
      <Header />

      <TextField
        id="input-search"
        label="Search by company name"
        value={currentFilters.search}
        onChange={(e) => handleSearchPhrase(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />

      {offersQuery.isPending || exchangeRatesQuery.isPending ? (
        new Array(pageSize)
          .fill(null)
          .map((_, index) => <OfferBoxBlankSlate key={index} />)
      ) : (
        <>
          <section>
            {offersQuery.data.offers.map((offer: Offer, index: number) => (
              <OfferBox
                offer={offer}
                exchangeRates={exchangeRatesQuery.data}
                key={index}
              />
            ))}
          </section>
          <Footer totalPages={offersQuery.data.pages.totalPages} page={page} />
        </>
      )}
    </MainWrapper>
  );
};

export default App;
