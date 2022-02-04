import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme: Theme) => ({
  aboutPageImage: {
    borderRadius: '50%',
    float: 'right',
    height: '15vw',
    marginBottom: theme.spacing(2),
    width: '15vw',
  },
  aboutPageBlock: {
    lineHeight: '24px',
    letterSpacing: '1px',
    wordSpacing: '1px',
  },
}));
