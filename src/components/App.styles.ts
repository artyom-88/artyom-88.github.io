import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { rybinsk } from '../assets';

const APP_HEADER_HEIGHT = 42;

export default makeStyles((theme: Theme) => {
  const footerHeight = theme.spacing(5);
  return createStyles({
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
      height: `calc(100% - ${footerHeight}px)`,
      paddingTop: `${APP_HEADER_HEIGHT}px`,
      marginBottom: `${footerHeight}px`,
    },
    appFooter: {
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      bottom: 0,
      color: theme.palette.common.white,
      display: 'flex',
      height: `${footerHeight}px`,
      justifyContent: 'center',
      left: 0,
      position: 'fixed',
      right: 0,
    },
    appHeader: {
      height: `${APP_HEADER_HEIGHT}px`,
      left: 0,
      position: 'fixed',
      right: 0,
    },
  });
});
