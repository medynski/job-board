import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { useUpdateOffersQuery } from '../../hooks/queries/useUpdateOffersQuery';
import { useSearchParamsStore } from '../../state/useSearchParamsStore';
import { Box } from './box';
import { SearchBox } from './search-box';

export const SearchCriteria: FunctionComponent = () => {
  const resetSearchParams = useSearchParamsStore(
    (state) => state.resetSearchParams
  );

  const hasSearchParamsChanged = useSearchParamsStore(
    (state) => state.hasSearchParamsChanged
  );

  const { fetchJIIT, fetchNFJ } = useUpdateOffersQuery();

  return (
    <Box>
      <aside>
        <div
          css={css`
            margin-bottom: 5px;
            font-size: 14px;
          `}
        >
          Search criteria:
        </div>
        <SearchBox />
        <div
          css={css`
            margin-top: 5px;
            display: flex;
            justify-content: flex-end;
          `}
        >
          <Button
            css={css`
              font-size: 10px;
            `}
            onClick={resetSearchParams}
            variant="outlined"
            size="small"
            disabled={!hasSearchParamsChanged}
          >
            Reset
          </Button>
        </div>

        <div
          css={css`
            margin-top: 50px;
            display: flex;
            justify-content: space-evenly;
          `}
        >
          <Button onClick={() => fetchJIIT.mutate()} variant="outlined">
            JIIT
          </Button>
          <Button onClick={() => fetchNFJ.mutate()} variant="outlined">
            NFJ
          </Button>
        </div>
      </aside>
    </Box>
  );
};
