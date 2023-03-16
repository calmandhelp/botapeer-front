import React, { ReactNode, useState, useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import { css } from "@emotion/react";
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/router'
import BreadCrumbs, { BreadCrumbProps } from "components/BreadCrumbs";
import Alert from "components/Alert";
import { Error } from "util/redux/apiBaseUtils";
import { ErrorResponse } from "botapeer-openapi/typescript-axios";

type Props = {
  children?: ReactNode
  breadCrumbProps?: BreadCrumbProps
  errorResponse?: ErrorResponse
  propMessage?: string
  handleMessageReset?: () => void
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

export const Layout = ({ children, breadCrumbProps, errorResponse, propMessage, handleMessageReset }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const login = router.query.login;
  const logout = router.query.logout;
  const expired = router.query.expired;
  const [message, setMessage] = useState('');

  useEffect(()=>{
    if(login) {
      setMessage("ログインしました");
      setOpen(true);
    }
    if(logout) {
      setMessage("ログアウトしました");
      setOpen(true);
    }
    if(expired) {
      setMessage("長時間ログイン状態が続いたためログアウトしました");
      setOpen(true);
    }
  },[login, logout, expired])

  useEffect(() => {
    if(errorResponse?.errors && errorResponse?.errors?.length != 0) {
      setOpen(true);
    }
    if(propMessage) {
      setOpen(true);
    }
  },[errorResponse, propMessage])

  const handleCloseAlert = () => {
    setOpen(false);
    setTimeout(() => {
      if(handleMessageReset) {
        handleMessageReset();
      }
    },200)
  }

  return (
    <>
      <Header />
        <Alert
          handleCloseAlert={handleCloseAlert}
          message={propMessage ?? message}
          errorsResponse={errorResponse}
          handleBarClose={handleCloseAlert}
          open={open}
          />
      <main css={MainCss}>
        <div css={breadCss}>
          {breadCrumbProps ? 
          <BreadCrumbs {...breadCrumbProps} />: ""}
        </div>
        <div css={ContainerCss}>
          <div css={ContentCss}>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )

};
