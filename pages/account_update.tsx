import React, { ReactNode, useState, useEffect } from "react";
import Auth  from 'components/Auth';
import { css } from "@emotion/react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { selectAuth } from "redux/slice/authSlice";
import { selectUser, fetchUserById } from "redux/slice/userSlice";
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage } from "constants/pageConstants";
import { accountUpdatePage } from '../src/constants/pageConstants';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Account = ({}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const login = router.query.login;
  const logout = router.query.logout;

  useEffect(()=>{
    if(login || logout) {
      setOpen(true);
    }
  },[login, logout])

  useEffect(() => {
    const userId = auth.userId;
    if(!userId) {
      return;
    } else {
      dispatch(fetchUserById(userId));
    }
  },[auth.userId, dispatch])

  const childPages = [
    {
    href: accountPage.path,
    label: accountPage.text,
    }
  ]

  const currentPage = {
    label: accountUpdatePage.text
  }

  const breadCrumb = {
    childPages: childPages,
    currentPage: currentPage
  }

  return (
    <Auth>
      <Layout breadCrumbProps={breadCrumb}>
        <>
        <h2>アカウント情報更新</h2>
        <Divider />
        </>
     </Layout>
    </Auth>
  );
};

export default Account;
