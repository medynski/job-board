import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton, Tooltip, css } from '@mui/material';
import { red } from '@mui/material/colors';
import { FunctionComponent } from 'react';
import { useFavoritesQuery } from '../hooks/queries/useFavoritesQuery';

export const FavoritesIndicator: FunctionComponent = () => {
  const { favoritesCount } = useFavoritesQuery();

  return (
    <Tooltip
      title={`Favorite offers: ${favoritesCount.data?.count || 0}`}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -10],
              },
            },
          ],
        },
      }}
      arrow
    >
      <IconButton color="secondary" aria-label="add to shopping cart">
        <FavoriteIcon
          color="error"
          css={css`
            fill: ${red[500]};
          `}
        />
      </IconButton>
    </Tooltip>
  );
};
