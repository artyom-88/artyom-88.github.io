import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme: Theme) => ({
  pageContainer: {
    height: `calc(100% - ${theme.spacing(2)}px)`,
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    opacity: '0.8',
  },
  pageContainerIcon: {
    marginBottom: theme.spacing(2),
  },
  pageContainerTitle: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));
