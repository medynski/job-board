import { CircularProgress } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = {
  circleIndeterminate: {
    animation: 'none',
    strokeDasharray: '80px, 200px',
    strokeDashoffset: '0px',
  },
};

const fixedCircularProgress = ({
  classes,
}: {
  classes: { [key: string]: string };
}) => (
  <CircularProgress
    classes={{ circleIndeterminate: classes.circleIndeterminate }}
  />
);

export const Progress = withStyles({
  circleIndeterminate: {
    animation: 'none',
    strokeDasharray: '80px, 200px',
    strokeDashoffset: '0px',
  },
})(CircularProgress);
