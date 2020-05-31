import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    aboutPageCard: {
      marginRight: theme.spacing(2),
    },
    aboutPageContent: {
      padding: theme.spacing(2),
    },
    aboutPageBlock: {
      lineHeight: '24px',
      letterSpacing: '1px',
      wordSpacing: '1px',
    },
  })
);
