import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { loadingIndicator } from 'assets';

const INDICATOR_SIZE = '120px';

export default makeStyles(() =>
  createStyles({
    loadingIndicatorContainer: {
      flexBasis: '100%',
      flexGrow: 1,
      height: '100%',
    },
    loadingIndicator: {
      backgroundImage: `url('${loadingIndicator}')`,
      width: INDICATOR_SIZE,
      height: INDICATOR_SIZE,
    },
  })
);
