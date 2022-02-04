import makeStyles from '@mui/styles/makeStyles';
import { loadingIndicator } from 'assets';

const INDICATOR_SIZE = '120px';

export default makeStyles(() => ({
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
}));
