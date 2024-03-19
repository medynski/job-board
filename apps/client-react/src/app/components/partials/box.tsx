import { FunctionComponent, PropsWithChildren } from 'react';

export const Box: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded p-2 relative flex border-solid border-gray-700 border my-2.5">
      {children}
    </div>
  );
};
