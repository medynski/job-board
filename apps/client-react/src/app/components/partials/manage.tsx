import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { useUpdateOffersQuery } from '../../hooks/queries/useUpdateOffersQuery';
import { Box } from './box';

export const Manage: FunctionComponent = () => {
  const { fetchJIIT, fetchNFJ } = useUpdateOffersQuery();

  return (
    <Box>
      <div
        css={css`
          width: 100%;
        `}
      >
        <div
          css={css`
            margin-bottom: 5px;
            font-size: 14px;
          `}
        >
          Manage offers:
        </div>
        <div
          css={css`
            margin-top: 20px;
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
      </div>
    </Box>
  );
};
