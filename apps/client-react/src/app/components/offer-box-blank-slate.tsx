import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import { FunctionComponent } from 'react';
import { BlankSlate } from './blank-slate';

const Box = styled.div`
  border: 1px solid ${grey[300]};
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  position: relative;
  display: flex;
`;

export const OfferBoxBlankSlate: FunctionComponent = () => {
  return (
    <Box>
      <section
        css={css`
          margin-right: 10px;
        `}
      >
        <BlankSlate width={72} height={72} />
      </section>
      <section>
        <div
          css={css`
            font-weight: bold;
            margin-bottom: 5px;
            display: flex;
          `}
        >
          <div>
            <BlankSlate width={250} height={24} />
          </div>
        </div>
        <div
          css={css`
            font-size: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
            color: #383838;
          `}
        >
          <BlankSlate width={100} height={12} />
        </div>

        <div
          css={css`
            font-size: 12px;
          `}
        >
          <BlankSlate width={500} />
        </div>

        <div
          css={css`
            position: absolute;
            top: 20px;
            right: 10px;
          `}
        >
          <BlankSlate width={109} height={24} />
        </div>

        <div
          css={css`
            position: absolute;
            top: 5px;
            right: 10px;
          `}
        >
          <BlankSlate width={52} height={14} />
        </div>
      </section>
    </Box>
  );
};
