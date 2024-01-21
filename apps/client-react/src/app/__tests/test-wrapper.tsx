import { css } from '@emotion/react';
import { Counter } from './counter';
import { Routing } from './routing';
import { TenstackQueryPlayground } from './tenstack-query-playground';

export const TestWrapper = () => {
  return (
    <div
      css={css`
        display: block;
      `}
    >
      <TenstackQueryPlayground />
      <Counter />
      <Routing />
    </div>
  );
};
