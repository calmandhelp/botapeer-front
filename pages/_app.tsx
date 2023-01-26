import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppPropsWithLayout } from "next/app";
import "../styles/global.css";
import theme from "../styles/Theme";
import { store } from 'redux/store/store'
import { Provider } from 'react-redux'
import { useEffect } from "react";
import { ACCESS_TOKEN } from "constants/apiConstants";
import jwtDecode from "jwt-decode";
import { Token } from "util/redux/apiBaseUtils";
import { logout, persitLogin, selectAuth } from "redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { useRouter } from "next/router";
import { rootPage } from "constants/pageConstants";

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
