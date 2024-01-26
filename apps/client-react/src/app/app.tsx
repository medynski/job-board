import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
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
import {
  SearchParamsStore,
  useSearchParamsStore,
} from './state/useSearchParamsStore';
import { apiUrl } from './utils/api-url';

const MainWrapper = styled.div`
  position: relative;
  width: 70%;
  margin: 0 auto;
`;

const pageSize = '10';

export const App: FunctionComponent = () => {
  const currentPage = useSearchParamsStore(
    (state: SearchParamsStore) => state.page
  );
  const currentSearch = useSearchParamsStore(
    (state: SearchParamsStore) => state.search
  );
  const currentPageSize = useSearchParamsStore(
    (state: SearchParamsStore) => state.pageSize
  );

  const handleSearchPhrase = useSearchParamsStore(
    (state: SearchParamsStore) => state.handleSearchPhrase
  );

  const navigate = useNavigate();
  const { page, search, mapSearchParams } = useSearchParams();
  const [searchPhrase, setSearchPhrase] = useState(search);
  const debounceSearchPhrase = useDebounceValue(searchPhrase);

  useEffect(() => {
    console.info({ currentPage, currentSearch });
    const queryParams = mapSearchParams({
      page: currentPage,
      search: currentSearch,
      pageSize: currentPageSize,
    });
    navigate(`/?${queryParams}`);
  }, [currentPage, currentSearch, navigate, mapSearchParams, currentPageSize]);

  useEffect(() => {
    handleSearchPhrase(debounceSearchPhrase);
  }, [debounceSearchPhrase, handleSearchPhrase]);

  const [offersQuery, exchangeRatesQuery] = useQueries({
    queries: [
      {
        queryKey: ['offers', page, search],
        queryFn: () => {
          const queryParams = mapSearchParams({
            page,
            search,
            pageSize: currentPageSize,
          });

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
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
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
          <Footer totalPages={offersQuery.data.pages.totalPages} page={+page} />
        )}
      </section>
    </MainWrapper>
  );
};

export default App;
