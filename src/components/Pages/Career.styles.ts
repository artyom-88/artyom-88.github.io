import { createStyles, makeStyles } from '@material-ui/core/styles';

const color = '#70719b';

export default makeStyles(() =>
  createStyles({
    careerItem: {
      lineHeight: '24px',
      letterSpacing: '1px',
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
