import React, { ReactNode, useState, useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import { css } from "@emotion/react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRouter } from 'next/router'
import BreadCrumbs, { BreadCrumbProps } from "components/BreadCrumbs";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  children?: ReactNode
  breadCrumbProps?: BreadCrumbProps
}

const MainCss = css`
  display: flex;
  flex-direction: column;
  background: #e7ebe7;
  flex: 1;
`;

const ContentCss = css`
  flex: 1;
  border-radius: 10px;
  background: #fff;
  padding: 16px;
`;
const ContainerCss = {
  display: "flex",
  height: "100%",
  "@media screen and (min-width:960px)": {
    width: "960px",
    margin: "0 auto 32px auto",
  },
};

const breadCss = css `
  margin: 32px auto;
  width: 960px;
`

export const Layout = ({ children, breadCrumbProps }: Props) => {

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const login = router.query.login;
  const logout = router.query.logout;

  useEffect(()=>{
    if(login || logout) {
      setOpen(true);
    }
  },[login, logout])

  return (
    <>
      <Header />
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: '100%', background: "#5EB476", color: "#fff", fontWeight: "bold" }}>
          { login ? "ログインしました" : <></>}
          { logout ? "ログアウトしました" : <></>}
        </Alert>
      </Snackbar>
      <main css={MainCss}>
        <div css={breadCss}>
          {breadCrumbProps ? 
          <BreadCrumbs {...breadCrumbProps} />: ""}
        </div>
        <div css={ContainerCss}>
          <div css={ContentCss}>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )

};
