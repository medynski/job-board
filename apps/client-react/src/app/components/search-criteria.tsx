import { SerializedStyles, css } from '@emotion/react';
import { FunctionComponent } from 'react';
import { Box } from './../components/box';
import { SearchBox } from './../components/search-box';

export const SearchCriteria: FunctionComponent<{
  cssStyles: SerializedStyles;
}> = ({ cssStyles }) => {
  return (
    <Box css={cssStyles}>
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
      </aside>
    </Box>
  );
};
