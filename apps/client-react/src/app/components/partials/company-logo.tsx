import styled from '@emotion/styled';
import { Nullable } from '@job-board/api-interfaces';
import { grey } from '@mui/material/colors';
import { FunctionComponent } from 'react';

const CompanyLogoBox = styled.div<{ url: Nullable<string> }>`
  background: ${(props) =>
    props.url ? `#fff url(${props.url}) no-repeat center center;` : grey[300]};
`;

export const CompanyLogo: FunctionComponent<{
  companyLogoUrl: Nullable<string>;
}> = ({ companyLogoUrl }) => {
  return (
    <div className="w-[72px] h-[72px] border relative mr-2.5 p-2.5 rounded border-gray-900 border-solid">
      <CompanyLogoBox
        url={companyLogoUrl}
        className="w-[50px] h-[50px] bg-contain"
      />
    </div>
  );
};
