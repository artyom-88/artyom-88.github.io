import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { FOOTER_HEIGHT_SPACING } from 'common/const/layout.const';

const paddingTopSpacing = 2;

export default makeStyles((theme: Theme) => ({
  pageContainer: {
    height: `calc(100% - ${theme.spacing(FOOTER_HEIGHT_SPACING + paddingTopSpacing)})`,
    overflow: 'auto',
    paddingTop: theme.spacing(paddingTopSpacing),
    opacity: '0.8',
  },
  pageContainerTitle: {
    marginLeft: theme.spacing(1),
  },
}));
