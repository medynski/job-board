import { Alert, Slide, SlideProps } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { FunctionComponent, SyntheticEvent } from 'react';
import { useSnackbarStore } from '../../state/useSnackbarStore';

const SlideTransition: FunctionComponent<SlideProps> = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

export const CustomSnackbar: FunctionComponent = () => {
  const isOpened = useSnackbarStore((store) => store.isOpened);
  const message = useSnackbarStore((store) => store.message);
  const close = useSnackbarStore((store) => store.close);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    close();
  };

  return (
    <Snackbar
      open={isOpened}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
