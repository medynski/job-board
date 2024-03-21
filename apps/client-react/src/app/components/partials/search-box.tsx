import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { FunctionComponent, useEffect, useRef } from 'react';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import {
  SearchParamsStore,
  useSearchParamsStore,
} from '../../state/useSearchParamsStore';

export const SearchBox: FunctionComponent = () => {
  const currentSearch = useSearchParamsStore(
    (state: SearchParamsStore) => state.currentSearch
  );
  const setCurrentSearch = useSearchParamsStore(
    (state: SearchParamsStore) => state.setCurrentSearch
  );
  const handleSearchPhrase = useSearchParamsStore(
    (state: SearchParamsStore) => state.handleSearchPhrase
  );

  const debounceSearchPhrase = useDebounceValue(currentSearch);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      handleSearchPhrase(debounceSearchPhrase);
    } else {
      isMountedRef.current = true;
    }
  }, [debounceSearchPhrase, handleSearchPhrase]);

  return (
    <TextField
      id="input-search"
      value={currentSearch}
      onChange={(e) => setCurrentSearch(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment className="mr-2.5" position="start">
            <SearchIcon className="text-grey-700" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      size="small"
      className="w-full"
    />
  );
};
