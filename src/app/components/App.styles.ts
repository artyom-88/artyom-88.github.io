import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { rybinsk } from 'assets';
import { FOOTER_HEIGHT_RATE, HEADER_HEIGHT_RATE } from 'common/const/layout.const';

export default makeStyles((theme: Theme) => {
  const footerHeight = theme.spacing(FOOTER_HEIGHT_RATE);
  const headerHeight = theme.spacing(HEADER_HEIGHT_RATE);
  return {
    app: {
      backgroundImage: `url('${rybinsk}')`,
      backgroundSize: 'cover',
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    appHeader: {
      height: `${headerHeight}`,
    },
    appContent: {
      height: `calc(100% - ${footerHeight})`,
      marginBottom: `${footerHeight}px`,
      paddingTop: `${headerHeight}px`,
    },
    appFooter: {
      bottom: 0,
      height: `${footerHeight}px`,
      left: 0,
      position: 'fixed',
      right: 0,
    },
  };
});
