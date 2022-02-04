import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { rybinsk } from 'assets';
import { FOOTER_HEIGHT_SPACING, HEADER_HEIGHT_SPACING } from 'common/const/layout.const';

export default makeStyles((theme: Theme) => {
  const footerHeight = theme.spacing(FOOTER_HEIGHT_SPACING);
  const headerHeight = theme.spacing(HEADER_HEIGHT_SPACING);
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
