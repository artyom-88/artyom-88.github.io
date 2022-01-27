import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const color = '#70719b';

export default makeStyles((theme: Theme) =>
  createStyles({
    careerItem: {
      marginBottom: theme.spacing(2),
    },
    careerItemContent: {
      letterSpacing: '1px',
      lineHeight: '24px',
      padding: theme.spacing(2),
      wordSpacing: '1px',
    },
    careerDetail: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
    careerTitle: {
      color,
    },
    careerDates: {
      color,
      fontStyle: 'italic',
    },
  })
);
