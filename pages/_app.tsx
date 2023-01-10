import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppPropsWithLayout } from "next/app";
import "../styles/global.css";
import theme from "../styles/Theme";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
