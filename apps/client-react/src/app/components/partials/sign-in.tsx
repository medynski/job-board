import GoogleIcon from '@mui/icons-material/Google';
import { Button, Tooltip } from '@mui/material';
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
        size="small"
        className="normal-case border-gray-900 text-gray-900 truncate"
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
      className="bg-gray-900 normal-case truncate"
    >
      Sign in with <GoogleIcon className="ml-1 text-lg fill-white" />
    </Button>
  );
};
