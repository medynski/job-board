import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { FunctionComponent, useEffect } from 'react';
import { useStore } from 'zustand';
import { useDebounceValue } from '../hooks/useDebounceValue';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from './../state/useSearchParamsStore';

export const SearchBox: FunctionComponent = () => {
  const store = useSearchParamsStore();

  const currentSearch = useStore(
    store,
    (state: SearchParamsStore) => state.currentSearch
  );

  const setCurrentSearch = useStore(
    store,
    (state: SearchParamsStore) => state.setCurrentSearch
  );

  const handleSearchPhrase = useStore(
    store,
    (state: SearchParamsStore) => state.handleSearchPhrase
  );

  const debounceSearchPhrase = useDebounceValue(currentSearch);

  useEffect(() => {
    handleSearchPhrase(debounceSearchPhrase);
  }, [debounceSearchPhrase, handleSearchPhrase]);

  return (
    <TextField
      id="input-search"
      value={currentSearch}
      onChange={(e) => setCurrentSearch(e.target.value)}
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
  );
};
