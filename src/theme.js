import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
 

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#008080',
    },
    secondary: {
      main: '#ff8749',
    },
    error: {
      main: '#e03838',
    },
  },
  typography: {
    fontFamily: 'Manrope-Medium',
  },
});

export default theme;
