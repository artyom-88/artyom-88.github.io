import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const textDecoration = 'underline';

export default makeStyles((theme: Theme) =>
  createStyles({
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
      fontWeight: 'bold',
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
  })
);
