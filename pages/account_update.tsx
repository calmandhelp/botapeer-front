import React, { ReactNode, useState, useEffect } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { selectAuth } from "redux/slice/authSlice";
import { selectUser, fetchUserById, UserData, updateUser } from "redux/slice/userSlice";
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage } from "constants/pageConstants";
import { accountUpdatePage } from 'constants/pageConstants';
import { css } from '@emotion/react';
import DatePicker from 'components/DatePicker';
import Button from "components/Button";
import TextArea from "components/TextArea";
import { userAgentFromString } from "next/server";
import { UserRequest } from "util/userApiUtils";
import Image from "next/image";

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

const CoverCss = css`
  height: 250px;
  width: 100%;
`

const AccountUpdate = ({}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const login = router.query.login;
  const logout = router.query.logout;
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [password, setPassword] = useState<string>();

  useEffect(() => {
    const userId = auth.userId;
    if(!userId) {
      return;
    } else {
      dispatch(fetchUserById(userId));
    }
  },[auth.userId, dispatch])

  useEffect(() => {
    if(user.status == "succeeded") {
      setName(user?.data?.name);
      setDescription(user?.data?.description);
    }
  },[user])

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

  const userRequest: UserRequest = {
    id: auth.userId,
    name,
    description,
    password
  }

  const handleClick = () => {
    dispatch(updateUser(userRequest)).then(() => {
      setPassword("");
      alert("更新完了しました。");
    });
  }

  return (
    <Auth>
      <Layout breadCrumbProps={breadCrumb}>
        <div css={WrapCss}>
        <h2>アカウント情報更新</h2>
        <Divider />
         <div css={InnerCss}>
          <div css={InputsCss}>
            <div css={CoverCss}>
              <Image src={user.data?.profileImage ?? ""} objectFit='cover' alt="profile image" layout='fill' />
            </div>
            <Input
            labelText="名前"
            type="text"
            handleInput={(e) => setName(e.target.value)}
            text={name ?? ""}
            /><br /><br />
            <TextArea
            labelText="説明"
            type="text"
            handleInput={(e) => setDescription(e.target.value)}
            text={description ?? ""}
            /><br /><br />
            <Input
            labelText="パスワード"
            type="password"
            handleInput={(e) => setPassword(e.target.value)}
            text={password ?? ""}
            /><br /><br />
          </div>
          <div css={submitAreaCss}> 
            <Button handleClick={handleClick}>更新</Button>
          </div>
         </div>
        </div>
     </Layout>
    </Auth>
  );
};

export default AccountUpdate;
