import createTheme, { Theme } from '@mui/material/styles/createTheme';

const theme: Theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          opacity: 0.8,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          maxWidth: 80,
          minWidth: 60,
        },
      },
    },
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
