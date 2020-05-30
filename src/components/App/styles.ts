import { createStyles, makeStyles } from '@material-ui/core/styles';
import { rybinsk } from '../../assets';

const APP_HEADER_HEIGHT = '37px';
const APP_FOOTER_HEIGHT = '20px';

export default makeStyles(() =>
  createStyles({
    app: {
      backgroundImage: `url('${rybinsk}')`,
      backgroundSize: 'cover',
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    appContainer: {
      backgroundColor: 'white',
      height: '100vh',
      opacity: '0.7',
      '&:hover': {
        opacity: '0.8',
      },
    },
    appContent: {
      bottom: APP_FOOTER_HEIGHT,
      position: 'absolute',
      top: APP_HEADER_HEIGHT,
    },
    appFooter: {
      bottom: 0,
      height: APP_FOOTER_HEIGHT,
      left: 0,
      position: 'fixed',
      right: 0,
      textAlign: 'center',
    },
    appHeader: {
      height: APP_HEADER_HEIGHT,
    },
  })
);
