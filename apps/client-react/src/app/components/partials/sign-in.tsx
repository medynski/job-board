import { css } from '@emotion/react';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FunctionComponent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../state/useAuthStore';
import { BlankSlate } from './blank-slate';

export const SignIn: FunctionComponent = () => {
  const { handleSignIn, handleSignOut } = useAuth();
  const user = useAuthStore((state) => state.user);

  return user === null ? (
    <BlankSlate width={114} height={40} />
  ) : user ? (
    <Tooltip
      title="Sign out"
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
      <Button
        variant="outlined"
        size="small"
        css={css`
          text-transform: none;
          border-color: ${grey[900]};
          color: ${grey[900]};
        `}
        onClick={handleSignOut}
      >
        {user.name}
      </Button>
    </Tooltip>
  ) : (
    <Button
      onClick={handleSignIn}
      variant="contained"
      size="small"
      css={css`
        background-color: ${grey[900]};
        text-transform: none;
      `}
    >
      Sign in with{' '}
      <GoogleIcon
        css={css`
          margin-left: 3px;
          font-size: 18px;
          fill: #fff;
        `}
      />
    </Button>
  );
};
