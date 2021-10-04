import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => {
  return createStyles({
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
      float: 'right',
      height: '15vw',
      marginBottom: theme.spacing(2),
      width: '15vw',
    },
  });
});
