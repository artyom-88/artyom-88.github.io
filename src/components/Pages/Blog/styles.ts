import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    blogListItem: {
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
    blogListDate: {
      fontWeight: 'bold',
    },
    blogListLink: {},
  })
);
