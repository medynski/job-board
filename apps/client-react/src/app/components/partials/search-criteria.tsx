import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
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
      </aside>
    </Box>
  );
};
