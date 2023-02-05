import React, { ReactNode, useState, useEffect, RefObject, useRef, createRef } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, createPlantRecordPage, rootPage } from "constants/pageConstants";
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
const CreatePlantRecordView = ({}) => {
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

  const childPages = [
    {
    href:  rootPage.path + authUser.data?.name,
    label: accountPage.text,
    }
  ]

  const currentPage = {
    label: createPlantRecordPage.text
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
    dispatch(fetchPlaces())
  },[dispatch])

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
  },[dispatch, auth?.userId])

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
          <h2>{createPlantRecordPage.text}</h2>
          <Divider />
          <div css={InnerCss}>
            <div css={InputsCss}>
              <Input
              labelText="植物の名前"
              type="text"
              handleInput={(e) => setTitle(e.target.value)}
              text={title}
              /><br /><br />
              <Select
              titleText="置き場所"
              handleChange={(e) => setPlaceId(e.target.value)}
              value={placeId}
              options={options}
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

export default CreatePlantRecordView;
