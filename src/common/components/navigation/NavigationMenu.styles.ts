import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

const textDecoration = 'underline';

export default makeStyles((theme: Theme) => ({
  navigationMenu: {
    backgroundColor: theme.palette.primary.main,
  },
  navigationMenuLink: {
    '&.active': {
      textDecoration,
      '&:hover': {
        textDecoration,
      },
    },
    '&:hover': {
      textDecoration: 'none',
    },
    alignItems: 'center',
    color: '#343648',
    display: 'flex',
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
}));
