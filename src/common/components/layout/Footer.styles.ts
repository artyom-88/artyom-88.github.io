import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme: Theme) => ({
  footerText: {
    fontWeight: 'bold',
  },
  footerIcon: {
    marginLeft: theme.spacing(1),
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
}));
