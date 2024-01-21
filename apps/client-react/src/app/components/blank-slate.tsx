import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';

export const BlankSlate = styled.div<{ width?: number; height?: number }>`
  border-radius: 5px;
  position: relative;
  display: flex;

  width: ${(props) => (props.width || 100) + 'px'};
  height: ${(props) => (props.height || 16) + 'px'};
  animation: linear 1s placeHolderShimmer infinite;
  background-color: ${grey[200]};
  background: linear-gradient(
    to right,
    ${grey[200]} 8%,
    ${grey[300]} 18%,
    ${grey[200]} 33%
  );
  background-size: 800px 104px;

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;
