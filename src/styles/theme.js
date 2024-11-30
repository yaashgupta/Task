import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40', // Deep Teal
    },
    secondary: {
      main: '#ffb300', // Warm Yellow
    },
    background: {
      default: '#f4f6f8', // Light Gray
      paper: '#ffffff',  // Card Background
    },
    text: {
      primary: '#333333', // Dark Gray
      secondary: '#666666', // Subtle Gray
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
