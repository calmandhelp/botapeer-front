import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, plantRecordPage, rootPage } from "constants/pageConstants";
import { css } from '@emotion/react';
import { fetchAuthUserById, selectAuthUser } from "redux/slice/authUserSlice";
import { deletePost, fetchPlantRecordById, selectPlantRecord } from "redux/slice/plantRecordSlice";
import { Error, setupAuthConfig } from "util/redux/apiBaseUtils";
import DeleteIcon from '@mui/icons-material/Delete';
import { selectAuth } from "redux/slice/authSlice";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { API_BASE_URL } from "constants/apiConstants";
import { toDateTime } from "util/date/dateUtils";
import { ErrorResponse, PlantRecordResponse, PostResponse } from "botapeer-openapi/typescript-axios";
import Image from "components/Image";
import PersistLogin from "components/PersistLogin";
import { IMAGE_PATH } from "constants/appConstants";
import cookie from 'js-cookie';

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
  padding: 10px 0;
`

const picInfoCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 10px 0;
`

type Props = {
  post: PostResponse
}  

const PlantRecordPostView = ({ post }: Props) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const plantRecord = useAppSelector(selectPlantRecord);
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
    href:  plantRecordPage.path + post.plantRecordId,
    label: (plantRecord.data as PlantRecordResponse)?.title ?? ""
    }
  ]
 
  const currentPage = {
    label: post.title ?? ""
  }

  const breadCrumb = {
    childPages: childPages,
    currentPage: currentPage
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
    if(post.plantRecordId) {
      dispatch(fetchPlantRecordById(post.plantRecordId?.toString()))
    }
  },[post.plantRecordId])

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

  const handleDelete = async () => {
    if(post.plantRecordId && post.id) {
      const deletePostResultAction = await dispatch(deletePost([post.plantRecordId.toString(), post.id.toString(), setupAuthConfig()]));
      if(deletePost.fulfilled.match(deletePostResultAction)) {
        cookie.set('deletedPostId', post.id.toString());
        router.replace({pathname: plantRecordPage.path + post.plantRecordId, query: { deletedPostId: post.id.toString() }});
      } else {
        setErrors(deletePostResultAction.payload as ErrorResponse);
      }
    }
  }

  return (
    <PersistLogin>
      <Layout breadCrumbProps={breadCrumb} handleMessageReset={handleMessageReset} propMessage={message} errorResponse={errors}>
        <div css={WrapCss}>
         <div style={{width: "500px", margin: "0 auto"}}>
          <div>
            <h2>{post.title}</h2>
          </div>
         <Divider />
         <div css={InnerCss}>
         <div css={picInfoCss}>
          <div>{toDateTime(post.createdAt ?? "")}</div>
         </div>
          <div style={{position: "relative", margin: "0 auto"}}>
            <Image
              src={IMAGE_PATH + post?.imageUrl}
              width={500}
              height={500}
              alt="植物"
              />
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <DeleteIcon css={{color: '#707070', cursor: "pointer"}} onClick={handleDelete} />
            </div>
          </div>
          </div>
         </div>
        </div>
     </Layout>
    </PersistLogin>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { post, plant_record } = context.query;
  const res = await fetch(API_BASE_URL + "plant_records/" + plant_record + "/posts/" + post);
  const data = await res.json()
  console.log(data);
  if(!data || !data.id) {
    return {
      notFound: true
    }
  }
  return { props: { post: data } }
}

export default PlantRecordPostView;
