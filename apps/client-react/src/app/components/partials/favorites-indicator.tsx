import styled from '@emotion/styled';
import StarIcon from '@mui/icons-material/Star';
import { Badge, BadgeProps, IconButton, css } from '@mui/material';
import { orange } from '@mui/material/colors';
import { FunctionComponent } from 'react';
import { useFavoritesQuery } from '../../hooks/queries/useFavoritesQuery';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 4,
    top: 7,
    padding: '0 4px',
    transform: 'scale(0.7)',
  },
}));

export const FavoritesIndicator: FunctionComponent = () => {
  const { favoritesCount } = useFavoritesQuery();

  return (
    <StyledBadge
      badgeContent={favoritesCount.data?.count}
      invisible={!favoritesCount.data?.count}
      overlap="circular"
      color="error"
    >
      <IconButton aria-label="show favorites">
        <StarIcon
          css={css`
            fill: ${orange[500]};
          `}
        />
      </IconButton>
    </StyledBadge>
  );
};
