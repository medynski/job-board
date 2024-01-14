import { css } from '@emotion/react';
import { Counter } from './counter';
import { Routing } from './routing';

export const TestWrapper = () => {
  return (
    <div
      css={css`
        display: none;
      `}
    >
      <Counter />
      <Routing />
    </div>
  );
};
