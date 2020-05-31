import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { loadingIndicator } from '../../assets';

const INDICATOR_SIZE = '120px';

const useStyles = makeStyles(() =>
  createStyles({
    loadingIndicatorContainer: {
      height: '100%',
    },
    loadingIndicator: {
      backgroundImage: `url('${loadingIndicator}')`,
      width: INDICATOR_SIZE,
      height: INDICATOR_SIZE,
    },
  })
);

/**
 * Simple loading indicator based on SVG-image
 */
const LoadingIndicator: FunctionComponent = () => {
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
