import createTheme, { Theme } from '@mui/material/styles/createTheme';

const theme: Theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 'normal',
        },
      },
    },
  },
});

export default theme;
