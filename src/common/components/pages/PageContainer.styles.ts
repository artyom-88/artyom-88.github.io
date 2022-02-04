import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { FOOTER_HEIGHT_SPACING, HEADER_HEIGHT_SPACING } from 'common/const/layout.const';

export default makeStyles((theme: Theme) => ({
  pageContainer: {
    height: `calc(100% - ${theme.spacing(FOOTER_HEIGHT_SPACING + HEADER_HEIGHT_SPACING)})`,
    opacity: '0.8',
    overflow: 'auto',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  pageContainerTitle: {
    marginLeft: theme.spacing(1),
  },
}));
