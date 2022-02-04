import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme: Theme) => ({
  blogItem: {
    marginBottom: theme.spacing(2),
  },
  blogItemContent: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  blogListDate: {
    fontWeight: 'bold',
  },
}));
