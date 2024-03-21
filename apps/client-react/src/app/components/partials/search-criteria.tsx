import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { useSearchParamsStore } from '../../state/useSearchParamsStore';
import { SearchBox } from './search-box';

export const SearchCriteria: FunctionComponent = () => {
  const resetSearchParams = useSearchParamsStore(
    (state) => state.resetSearchParams
  );

  const hasSearchParamsChanged = useSearchParamsStore(
    (state) => state.hasSearchParamsChanged
  );

  return (
    <section className="md:mr-10">
      <div className="mb-1.5 text-sm">Search criteria:</div>
      <SearchBox />
      <div className="mt-1.5 flex justify-end">
        <Button
          className="text-xs"
          onClick={resetSearchParams}
          variant="outlined"
          size="small"
          disabled={!hasSearchParamsChanged}
        >
          Reset
        </Button>
      </div>
    </section>
  );
};
