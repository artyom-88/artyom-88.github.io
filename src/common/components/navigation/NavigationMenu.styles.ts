import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const textDecoration = 'underline';

export default makeStyles((theme: Theme) =>
  createStyles({
    navigationMenu: {
      backgroundColor: theme.palette.primary.main,
    },
    navigationMenuButton: {
      minWidth: '152px',
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
      flexGrow: 1,
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
  })
);
