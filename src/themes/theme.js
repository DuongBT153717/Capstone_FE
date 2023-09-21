import { createTheme } from "@mui/material";
import {} from '@mui/lab/themeAugmentation';
export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  },
  components: {
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    }
  }
});
