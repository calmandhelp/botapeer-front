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
import { createPlantRecord, createPost } from "redux/slice/plantRecordSlice";
import { Error } from "util/redux/apiBaseUtils";
import { selectAuth } from "redux/slice/authSlice";
import { Option } from "components/Select";
import { selectPlace } from "redux/slice/placeSlice";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { API_BASE_URL } from "constants/apiConstants";
import TextArea from "components/TextArea";
import FileUploader from "components/FileUploader";
import { PlantRecordResponse } from "botapeer-openapi/typescript-axios";

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
  const [errors, setErrors] = useState<Error[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const router = useRouter();

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
    const image = new File(["foo"], "foo.jpg");
    const formData = {title, article};
    
    const createPostAction = await dispatch(createPost({formData, image}))
    if(createPost.fulfilled.match(createPostAction)) {
      setMessage("作成しました");
      setTitle("")
      setArticle("")
    } else {
      if(createPostAction.payload) {
      } else {
        setErrors(JSON.parse(createPostAction.error.message as any).errors);
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
    setErrors([]);
  }

  useEffect(() => {
    if(auth?.userId) {
      dispatch(fetchAuthUserById(auth?.userId))
    }
  },[auth?.userId, dispatch])

  return (
     <Auth>
        <Layout breadCrumbProps={breadCrumb} propMessage={message} handleMessageReset={handleMessageReset} errors={errors}>
          <div css={WrapCss}>
          <h2>{createPlantRecordPostPage.text}</h2>
          <Divider />
          <div css={InnerCss}>
            <div css={InputsCss}>
              <FileUploader /><br /><br />
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
  console.log(data);
  if(!data || !data.id) {
    return {
      notFound: true
    }
  }
  return { props: { plantRecord: data } }
}

export default CreatePlantRecordPostView;
