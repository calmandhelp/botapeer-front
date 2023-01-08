import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";

interface MyAppProps extends AppProps {}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
