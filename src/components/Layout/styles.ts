import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    footerText: {
      fontWeight: 'bold',
    },
    footerIcon: {
      marginLeft: theme.spacing(1),
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
  })
);
