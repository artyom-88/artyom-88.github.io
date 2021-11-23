import Box from '@material-ui/core/Box';
import { ReactElement } from 'react';
import useStyles from './LoadingIndicator.styles';

/**
 * Simple loading indicator based on SVG-image
 */
const LoadingIndicator = (): ReactElement => {
  const classes = useStyles();
  return (
    <Box
      alignItems='center'
      className={classes.loadingIndicatorContainer}
      display='flex'
      flexBasis='100%'
      flexGrow={1}
      justifyContent='center'
    >
      <div className={classes.loadingIndicator} />
    </Box>
  );
};

export default LoadingIndicator;
