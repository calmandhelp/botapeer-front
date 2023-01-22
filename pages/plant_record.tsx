import React, { ReactNode, useState, useEffect } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { selectAuth } from "redux/slice/authSlice";
import { selectUser, fetchUserById, fetchUsersByName } from "redux/slice/userSlice";
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, plantRecordPage, rootPage } from "constants/pageConstants";
import { accountUpdatePage } from 'constants/pageConstants';
import { css } from '@emotion/react';
import DatePicker from 'components/DatePicker';
import Button from "components/Button";
import { InnerCss } from "style/common";
import { selectAuthUser } from "redux/slice/authUserSlice";

const WrapCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 32px;
`

const submitAreaCss = css`
  text-align: center;
  padding: 32px 0 0 0;
`

const InputsCss = css`
  flex: 1;
`

const Record = ({}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const login = router.query.login;
  const logout = router.query.logout;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(()=>{
    if(login || logout) {
      setOpen(true);
    }
  },[login, logout])

  useEffect(() => {
    const userName = authUser.data?.name;
    if(!userName) {
      return;
    } else {
      dispatch(fetchUsersByName(userName));
    }
  },[authUser, dispatch])

  const childPages = [
    {
    href:  rootPage.path + authUser.data?.name,
    label: accountPage.text,
    }
  ]

  const currentPage = {
    label: plantRecordPage.text
  }
  const breadCrumb = {
    childPages: childPages,
    currentPage: currentPage
  }

  const handleClick = () => {

  }

  return (
    <Auth>
      <Layout breadCrumbProps={breadCrumb}>
        <div css={WrapCss}>
        <h2>{plantRecordPage.text}</h2>
        <Divider />
         <div css={InnerCss}>
          <div css={InputsCss}>
            <Input
            labelText="生育記録のタイトル"
            type="text"
            handleInput={(e) => setTitle(e.target.value)}
            text={title}
            /><br /><br />
            <DatePicker
            handleChange={(date) => setDate(date)}
            value={date}
            labelText="日付"
            />
          </div>
          <div css={submitAreaCss}> 
            <Button handleClick={handleClick}>投稿</Button>
          </div>
         </div>
        </div>
     </Layout>
    </Auth>
  );
};

export default Record;
