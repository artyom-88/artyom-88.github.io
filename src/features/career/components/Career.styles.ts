import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

const color = '#70719b';

export default makeStyles((theme: Theme) => ({
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
}));
