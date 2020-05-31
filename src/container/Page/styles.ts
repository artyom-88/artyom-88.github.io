import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      height: `calc(100% - ${theme.spacing(2)}px)`,
      overflow: 'auto',
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
      opacity: '0.8',
    },
  })
);
