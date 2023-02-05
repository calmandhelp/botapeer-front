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
import { createPlantRecord } from "redux/slice/plantRecordSlice";
import { Error } from "util/redux/apiBaseUtils";
import { selectAuth } from "redux/slice/authSlice";
import Select, { Option } from "components/Select";
import { fetchPlaces, selectPlace } from "redux/slice/placeSlice";
import PersistLogin from "components/PersistLogin";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { API_BASE_URL } from "constants/apiConstants";
import { PlantRecord } from "model/plantRcord";
import TextArea from "components/TextArea";
import FileUploader from "components/FileUploader";

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
  plantRecord: PlantRecord
}  

const CreatePlantRecordPostView = ({plantRecord}: Props) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const auth = useAppSelector(selectAuth);
  const places = useAppSelector(selectPlace);
  const [title, setTitle] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [placeId, setPlaceId] = useState(0);
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
    if(!title || !placeId) {
      return
    }
    const data = {
      title,
      placeId
    }
    const createPlantRecordAction = await dispatch(createPlantRecord(data))
    if(createPlantRecord.fulfilled.match(createPlantRecordAction)) {
      setMessage("作成しました");
      setTitle("")
      setPlaceId(0)
    } else {
      if(createPlantRecordAction.payload) {
      } else {
        setErrors(JSON.parse(createPlantRecordAction.error.message as any).errors);
      }
    }
  }

  useEffect(() => {
    if(!title || !placeId) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  },[title, placeId])

  const handleMessageReset = () => {
    setMessage('');
    setErrors([]);
  }

  useEffect(() => {
    dispatch(fetchAuthUserById(auth?.userId))
  },[])

  useEffect(() => {
    if(places && Array.isArray(places?.data)) {
      const op: Option[] = []
      places?.data.map((place) => {
        op.push({value: place.id,label: place.name})
      })
      setOptions(op);
    }
  },[places])

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
              handleInput={(e) => setPlaceId(e.target.value)}
              text={title}
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
  const res = await fetch(API_BASE_URL + "/api/plant_records/" + plant_record);
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
