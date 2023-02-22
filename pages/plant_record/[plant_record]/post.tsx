import React, { ReactNode, useState, useEffect, RefObject, useRef, createRef } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, createPlantRecordPage, createPlantRecordPostPage, plantRecordPage, rootPage } from "constants/pageConstants";
import { css } from '@emotion/react';
import Button from "components/Button";
import { InnerCss } from "style/common";
import { fetchAuthUserById, selectAuthUser } from "redux/slice/authUserSlice";
import { createPost } from "redux/slice/postSlice";
import { Error, setupAuthConfig } from "util/redux/apiBaseUtils";
import { selectAuth } from "redux/slice/authSlice";
import { Option } from "components/Select";
import { selectPlace } from "redux/slice/placeSlice";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { API_BASE_URL } from "constants/apiConstants";
import TextArea from "components/TextArea";
import FileUploader from "components/FileUploader";
import { ErrorResponse, PlantRecordResponse } from "botapeer-openapi/typescript-axios";
import { DropzoneRef } from "react-dropzone";
import Image from "components/Image";

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

type Props = {
  plantRecord: PlantRecordResponse
}  

const CreatePlantRecordPostView = ({plantRecord}: Props) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const auth = useAppSelector(selectAuth);
  const [title, setTitle] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [article, setArticle] = useState("");
  const [errors, setErrors] = useState<ErrorResponse>();
  const [files, setFiles] = useState<File[]>();
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState<string | undefined>('');

  const childPages = [
    {
    href: rootPage.path + authUser.data?.name,
    label: authUser.data?.name ? authUser.data?.name + "さんの" + accountPage.text : "",
    },
    {
    href:  plantRecordPage.path + plantRecord.id,
    label: plantRecord.title ?? "",
    }
  ]

  const currentPage = {
    label: createPlantRecordPostPage.text ?? ""
  }

  const breadCrumb = {
    childPages: childPages,
    currentPage: currentPage
  }

  const handleCreate = async () => {
    if(!title || !article) {
      return
    }
    const formData = {title, article};
    
    const plantRecordId = plantRecord?.id?.toString() ?? "";

    if(files && files[0]) {
      const createPostAction = await dispatch(createPost([plantRecordId, files[0], formData, setupAuthConfig()]))
      if(createPost.fulfilled.match(createPostAction)) {
        setMessage("作成しました");
        setTitle("")
        setArticle("")
        setFiles(undefined)
      } else {
        setErrors(createPostAction.payload as ErrorResponse);
      }
    }
  }

  useEffect(() => {
    if(!title || !article) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  },[title, article])

  const handleMessageReset = () => {
    setMessage('');
    setErrors(undefined);
  }

  useEffect(() => {
    if(auth?.userId) {
      dispatch(fetchAuthUserById(auth?.userId))
    }
  },[auth?.userId, dispatch])

  useEffect(() => {
      if(files && files.length > 0) {
        var _binaryData = [];
        _binaryData.push(files[0]);
        const _file = window.URL.createObjectURL(new Blob(_binaryData, {type: "application/zip"}))
        setFileUrl(_file);
      } else {
        setFileUrl("");
      }
  },[files])
 
  return (
     <Auth>
        <Layout breadCrumbProps={breadCrumb} propMessage={message} handleMessageReset={handleMessageReset} errorResponse={errors}>
          <div css={WrapCss}>
          <h2>{createPlantRecordPostPage.text}</h2>
          <Divider />
          <div css={InnerCss}>
            <div css={InputsCss}>
              <FileUploader setFiles={setFiles}/><br />
              {fileUrl ? <><Image src={fileUrl} alt="投稿画像" width={200} height={200} /><br /><br /></> : null}
              <Input
              labelText="タイトル"
              type="text"
              handleInput={(e) => setTitle(e.target.value)}
              text={title}
              /><br /><br />
              <TextArea
              labelText="投稿内容"
              handleInput={(e) => setArticle(e.target.value)}
              text={article}
              /><br /><br />
            <ul>
            </ul>
            </div>
            <div css={submitAreaCss}> 
              <Button handleClick={handleCreate} disabled={buttonDisabled}>作成</Button>
            </div>
          </div>
          </div>
        </Layout>
     </Auth>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { plant_record } = context.query;
  const res = await fetch(API_BASE_URL + "plant_records/" + plant_record);
  const data = await res.json()
  if(!data || !data.id) {
    return {
      notFound: true
    }
  }
  return { props: { plantRecord: data } }
}

export default CreatePlantRecordPostView;
