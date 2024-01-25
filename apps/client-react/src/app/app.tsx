import styled from '@emotion/styled';
import { Offer, SearchParams } from '@job-board/api-interfaces';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, css } from '@mui/material';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { OfferBox } from './components/offer-box';
import { OfferBoxBlankSlate } from './components/offer-box-blank-slate';
import { useDebounceValue } from './hooks/useDebounceValue';
import { useSearchParams } from './hooks/useSearchParams';
import { apiUrl } from './utils/api-url';

const MainWrapper = styled.div`
  position: relative;
  width: 70%;
  margin: 0 auto;
`;

const pageSize = '10';

export const App: FunctionComponent = () => {
  const navigate = useNavigate();
  const { page, search, mapSearchParams } = useSearchParams();
  const [currentFilters, setCurrentFilters] = useState<SearchParams>({
    page,
    search,
    pageSize,
  });
  const debounceFilters = useDebounceValue(currentFilters);

  useEffect(() => {
    const queryParams = mapSearchParams(debounceFilters);
    console.warn(queryParams);
    navigate(`/?${queryParams}`);
  }, [debounceFilters, navigate, mapSearchParams]);

  const [offersQuery, exchangeRatesQuery] = useQueries({
    queries: [
      {
        queryKey: ['offers', debounceFilters.page, debounceFilters.search],
        queryFn: () => {
          const queryParams = mapSearchParams(currentFilters);

          return axios
            .get(`${apiUrl()}/offers?${queryParams}`)
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
    setCurrentFilters((prev) => ({
      ...prev,
      page: '1',
      search: newSearchPhrase,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentFilters((prev) => ({
      ...prev,
      page: String(newPage),
    }));
  };

  if (offersQuery.error || exchangeRatesQuery.error)
    return (
      'An error has occurred: ' + offersQuery.error?.message ||
      exchangeRatesQuery.error?.message
    );

  return (
    <MainWrapper>
      <Header />

      <section>
        <aside
          css={css`
            position: absolute;
            top: 5px;
            right: 10px;
          `}
        >
          <TextField
            id="input-search"
            value={currentFilters.search}
            onChange={(e) => handleSearchPhrase(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
        </aside>

        {offersQuery.isPending || exchangeRatesQuery.isPending
          ? new Array(+pageSize)
              .fill(null)
              .map((_, index) => <OfferBoxBlankSlate key={index} />)
          : offersQuery.data.offers.map((offer: Offer, index: number) => (
              <OfferBox
                offer={offer}
                exchangeRates={exchangeRatesQuery.data}
                key={index}
              />
            ))}

        {offersQuery.isSuccess && (
          <Footer
            totalPages={offersQuery.data.pages.totalPages}
            page={+page}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </MainWrapper>
  );
};

export default App;
