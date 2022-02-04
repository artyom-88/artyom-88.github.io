import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { FOOTER_HEIGHT_RATE } from 'common/const/layout.const';

const padding = 2;

export default makeStyles((theme: Theme) => ({
  pageContainer: {
    height: `calc(100% - ${theme.spacing(FOOTER_HEIGHT_RATE + padding)})`,
    overflow: 'auto',
    paddingTop: theme.spacing(padding),
    opacity: '0.8',
  },
  pageContainerTitle: {
    marginLeft: theme.spacing(1),
  },
}));
