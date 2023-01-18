import React, { ReactNode, useState, useEffect } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { selectAuth } from "redux/slice/authSlice";
import { selectUser, fetchUserById, UserData, updateUser } from "redux/slice/userSlice";
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, passwordUpdatePage } from "constants/pageConstants";
import { accountUpdatePage } from 'constants/pageConstants';
import { css } from '@emotion/react';
import Button from "components/Button";
import TextArea from "components/TextArea";
import { useRef } from "react";
import { appPath } from "constants/appConstants";
import Image from "components/Image";
import Link from "next/link";

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
const CircleCss = css`
  cursor: pointer;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: #E8E8E8;
`
const CoverCss = css`
  cursor: pointer;
  position: relative;
  background: #E8E8E8;
  height: 250px;
  width: 100%;
  margin: 0 0 80px 0;
`

const bgCircleCss = css`
  position: absolute;
  height: 115px;
  width: 115px;
  bottom: -50px;
  left: 30px;
  z-index: 1;
  background:#fff;
  border-radius: 50%;
`

const ProfileImageCss = css`
  &:hover {
    opacity: 0.8;
  }
`

const CoverImageCss = css`
  &:hover {
    opacity: 0.8;
  }
`

const AccountUpdate = ({}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const [fileCover, setFileCover] = useState<string | undefined>();
  const [fileProfile, setFileProfile] = useState<string | undefined>('');
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    password: "",
  })
  const [message, setMessage] = useState('');
  const fileProfileInput = useRef<HTMLInputElement>(null);
  const fileCoverInput = useRef<HTMLInputElement>(null);

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
      const _formData = Object.assign(formData, {
        name: user?.data?.name,
        description: user?.data?.description
      });
      if(user.data?.coverImage) {
        setFileCover(appPath + user.data?.coverImage);
      }
      if(user.data?.profileImage) {
        setFileProfile(appPath + user.data?.profileImage);
      }
      setFormData({..._formData});
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

  const handleClick = () => {

    const submitData = new FormData();

    submitData.append("formData", new Blob([JSON.stringify(formData)],{type : 'application/json'}));

    if(fileProfileInput?.current?.files) {
      const _file = fileProfileInput.current.files[0];
      submitData.append("profileImage", _file)
    }

    if(fileCoverInput?.current?.files) {
      const _file = fileCoverInput.current.files[0];
      submitData.append("coverImage", _file)
    }

    dispatch(updateUser(submitData)).then(() => {
      const _formData = Object.assign(formData, {password: ""});
      setFormData({..._formData});
      setMessage("更新しました");
    });
  }

  const handleCoverUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(files && files.length > 0) {
      var _binaryData = [];
      _binaryData.push(files[0]);
      const _file = window.URL.createObjectURL(new Blob(_binaryData, {type: "application/zip"}))
      setFileCover(_file);
    }
  }

  const handleProfileUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(files && files.length > 0) {
      var _binaryData = [];
      _binaryData.push(files[0]);
      const _file = window.URL.createObjectURL(new Blob(_binaryData, {type: "application/zip"}))
      setFileProfile(_file);
    }
  }

  const handleName = (name: string) => {
    const _formData = Object.assign(formData, {name});
    setFormData({..._formData});
  }

  const handleDesc = (description: string) => {
    const _formData = Object.assign(formData, {description});
    setFormData({..._formData});
  }

  const handleMessageReset = () => {
    setMessage('');
  }

  return (
    <Auth>
      <Layout breadCrumbProps={breadCrumb} propMessage={message} handleMessageReset={handleMessageReset}>
        <div css={WrapCss}>
        <h2>{accountUpdatePage.text}</h2>
        <Divider />
         <div css={InnerCss}>
          <div css={InputsCss}>
           <label htmlFor="cover_image">
            <div css={CoverCss}>
              <div css={bgCircleCss}>
                <label htmlFor="profile_image">
                <div css={CircleCss}>
                {fileProfile ?
                <Image src={fileProfile} objectFit='cover' alt="profile image" layout='fill' css={ProfileImageCss} />
                : null}
                </div>
                </label>
              </div>
              {fileCover ?
              <Image src={fileCover} objectFit='cover' alt="cover image" layout='fill' css={CoverImageCss} />
              : null}
            </div>
            </label>
            <Input
            labelText="名前"
            type="text"
            handleInput={(e) => handleName(e.target.value)}
            text={formData.name ?? ""}
            /><br /><br />
            <TextArea
            labelText="説明"
            type="text"
            handleInput={(e) => handleDesc(e.target.value)}
            text={formData.description ?? ""}
            /><br /><br />
            <Link href={passwordUpdatePage.path}>パスワードの更新</Link>
            <br /><br />
          </div>
          <div css={submitAreaCss}> 
            <Button handleClick={handleClick}>更新</Button>
          </div>
         </div>
         <input onChange={handleProfileUpdate} type="file" id="profile_image" ref={fileProfileInput} accept="image/*" hidden />
         <input onChange={handleCoverUpdate} type="file" id="cover_image" ref={fileCoverInput} accept="image/*" 
              hidden />
        </div>
     </Layout>
    </Auth>
  );
};

export default AccountUpdate;
