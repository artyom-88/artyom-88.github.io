import { ReactElement } from 'react';
import useStyles from './LoadingIndicator.styles';

/**
 * Simple loading indicator based on SVG-image
 */
const LoadingIndicator = (): ReactElement => {
  const classes = useStyles();
  const className = `${classes.loadingIndicatorContainer} ag-flexbox ag-justifyContent_center ag-alignItems_center`;
  return (
    <div className={className}>
      <div className={classes.loadingIndicator} />
    </div>
  );
};

export default LoadingIndicator;
