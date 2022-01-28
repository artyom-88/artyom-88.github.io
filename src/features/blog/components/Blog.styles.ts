import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
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
  })
);
