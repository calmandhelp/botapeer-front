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
import FileUploader from "components/FileUploader";
import { InnerCss } from "style/common";
import TextArea from "components/TextArea";

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

const PlantCreate = ({}) => {
  console.log("test");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    password: "",
})
  const submitData = new FormData();

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

  const handleDesc = (desc: string) => {
    const _formData = Object.assign(formData, {desc});
    setFormData(_formData);
  }

  return (
    <Auth>
      <Layout breadCrumbProps={breadCrumb}>
        <div css={WrapCss}>
        <h2>{plantCreatePage.text}</h2>
        <Divider />
         <div css={InnerCss}>
          <div css={InputsCss}>
            <FileUploader /><br /><br />
            <Input
            labelText="植物のタイトル"
            type="text"
            handleInput={(e) => setTitle(e.target.value)}
            text={title}
            /><br /><br />
            <TextArea
            labelText="コメント"
            type="text"
            handleInput={(e) => handleDesc(e.target.value)}
            text={formData.description ?? ""}
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
