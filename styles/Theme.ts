import { createTheme } from "@material-ui/core/styles";

export const primaryColor = "#5EB476"
export const deleteColor = "#d10000"

export const theme = createTheme({
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
      main: primaryColor,
    },
    background: {
      default: "#ededed"
    },
  },
});


export default theme