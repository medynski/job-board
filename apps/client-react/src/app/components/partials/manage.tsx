import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { useUpdateOffersQuery } from '../../hooks/queries/useUpdateOffersQuery';
import { Box } from './box';

export const Manage: FunctionComponent = () => {
  const { fetchJIIT, fetchNFJ, fetchExchangeRates } = useUpdateOffersQuery();

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
            flex-direction: column;
          `}
        >
          <div
            css={css`
              margin-bottom: 10px;
              font-size: 10px;
            `}
          >
            Update offers:
          </div>
          <div
            css={css`
              width: 100%;
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

          <div
            css={css`
              margin-top: 20px;
              margin-bottom: 10px;
              font-size: 10px;
            `}
          >
            Update exchange rates:
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-evenly;
            `}
          >
            <Button
              onClick={() => fetchExchangeRates.mutate()}
              variant="contained"
            >
              ER
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};
