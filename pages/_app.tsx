import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import "../styles/global.css";

interface MyAppProps extends AppProps {}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
