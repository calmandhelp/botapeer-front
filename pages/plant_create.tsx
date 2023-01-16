import React, { ReactNode, useState, useEffect } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { selectAuth } from "redux/slice/authSlice";
import { selectUser, fetchUserById } from "redux/slice/userSlice";
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, plantCreatePage, recordPage } from "constants/pageConstants";
import { accountUpdatePage } from 'constants/pageConstants';
import { css } from '@emotion/react';
import DatePicker from 'components/DatePicker';
import Button from "components/Button";

const WrapCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 32px;
`

const InnerCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 0;
`

const submitAreaCss = css`
  text-align: center;
  padding: 32px 0 0 0;
`

const InputsCss = css`
  flex: 1;
`

const PlantCreate = ({}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
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
    label: plantCreatePage.text
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
        <h2>{plantCreatePage.text}</h2>
        <Divider />
         <div css={InnerCss}>
          <div css={InputsCss}>
            <Input
            labelText="植物のタイトル"
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

export default PlantCreate;
