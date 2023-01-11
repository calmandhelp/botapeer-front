import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppPropsWithLayout } from "next/app";
import "../styles/global.css";
import theme from "../styles/Theme";
import { store } from 'redux/store/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
