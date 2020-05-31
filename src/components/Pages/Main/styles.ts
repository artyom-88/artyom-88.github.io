import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => {
  const margin = theme.spacing(2);
  return createStyles({
    mainPage: {
      display: 'flex',
      marginRight: margin,
    },
    mainPageContent: {
      flexShrink: 1,
    },
    mainPageBlock: {
      lineHeight: '24px',
      letterSpacing: '1px',
      wordSpacing: '1px',
    },
    mainPageImage: {
      borderRadius: '50%',
      flexShrink: 0,
      height: '15vw',
      margin,
      width: '15vw',
    },
  });
});
