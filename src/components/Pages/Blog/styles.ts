import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    blogListItem: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);
