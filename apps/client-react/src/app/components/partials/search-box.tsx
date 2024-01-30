import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, css } from '@mui/material';
import { grey } from '@mui/material/colors';
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
          <InputAdornment
            css={css`
              margin-right: -10px;
            `}
            position="start"
          >
            <SearchIcon
              css={css`
                fill: ${grey[700]};
              `}
            />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      size="small"
    />
  );
};
