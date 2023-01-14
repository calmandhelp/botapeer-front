import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 960,
      lg: 1100,
      xl: 1200
    },
  },
  palette: {
    primary: {
      main: '#5EB476',
    }
  }
});


export default theme