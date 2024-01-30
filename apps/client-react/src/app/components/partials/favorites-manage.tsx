import { Offer } from '@job-board/api-interfaces';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, Tooltip, css } from '@mui/material';
import { orange } from '@mui/material/colors';
import { FunctionComponent, useMemo } from 'react';
import { useFavoritesQuery } from '../../hooks/queries/useFavoritesQuery';
import { useAuthStore } from '../../state/useAuthStore';

export const FavoritesManage: FunctionComponent<{ offerUniqId: string }> = ({
  offerUniqId,
}) => {
  const { favorites, mutationAdd, mutationRemove } = useFavoritesQuery();
  const isFavorite = useMemo(() => {
    return favorites.data?.offers.find(
      (favoriteOffer: Offer) => favoriteOffer.uniqId === offerUniqId
    );
  }, [favorites, offerUniqId]);
  const userId = useAuthStore((state) => state.user?.userId);

  const toggleFavorite = () => {
    if (userId) {
      isFavorite
        ? mutationRemove.mutate(offerUniqId)
        : mutationAdd.mutate(offerUniqId);
    }
  };

  return (
    <Tooltip
      title={`${
        !userId
          ? 'Sign in to manage favorites'
          : isFavorite
          ? 'Remove from'
          : 'Add to'
      } favorites`}
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
      <IconButton
        css={css`
          transform: scale(0.7);
        `}
        color="secondary"
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <StarIcon
            css={css`
              fill: ${orange[500]};
            `}
          />
        ) : (
          <StarBorderIcon
            css={css`
              fill: ${orange[500]};
            `}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};
