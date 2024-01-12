import styled from '@emotion/styled';
import { Nullable } from '@job-board/api-interfaces';
import { FunctionComponent } from 'react';

const CompanyLogoWrapper = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #222;
  margin-right: 10px;
`;

const CompanyLogoBox = styled.div<{ url: Nullable<string> }>`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    props.url ? `#fff url(${props.url}) no-repeat center center;` : '#ccc'};
  background-size: contain;
`;

export const CompanyLogo: FunctionComponent<{
  companyLogoUrl: Nullable<string>;
}> = ({ companyLogoUrl }) => {
  return (
    <CompanyLogoWrapper>
      <CompanyLogoBox url={companyLogoUrl} />
    </CompanyLogoWrapper>
  );
};
