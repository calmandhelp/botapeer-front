import React, { ReactNode, useState, useEffect, RefObject, useRef, createRef } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { fetchUsersByName } from "redux/slice/userSlice";
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, plantRecordPage, rootPage } from "constants/pageConstants";
import { css } from '@emotion/react';
import Button from "components/Button";
import { InnerCss } from "style/common";
import { selectAuthUser } from "redux/slice/authUserSlice";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useTheme } from "@material-ui/core/styles";
import { deleteColor, primaryColor } from "../styles/Theme";
import { createPlantRecord } from "redux/slice/plantRecordSlice";
import { Error } from "util/redux/apiBaseUtils";

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
const PlantRecord = ({}) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const [labelList, setLabelList] = useState<string[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);

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

  const handleCreate = async () => {
    // if(!title || labelList.length == 0) {
    //   return
    // }
    const labels = labelList.map((label) => {
      return {name: label}
    })
    const data = {
      title,
      labels
    }
    const createPlantRecordAction = await dispatch(createPlantRecord(data))
    if(createPlantRecord.fulfilled.match(createPlantRecordAction)) {
      setMessage("更新しました");
      setLabelList([]);
      setTitle("")
    } else {
      if(createPlantRecordAction.payload) {
      } else {
        setErrors(JSON.parse(createPlantRecordAction.error.message as any).errors);
      }
    }
  }

  const handleAdd = () => {
    if(label && labelList.length < 20) {
      setLabelList(labelList.concat(label));
      setLabel("");
    }
  }

  const onKeyDown = (e: any) => {
    switch (e.key) {
      case  "Enter":
        if(composing) break;
        handleAdd();
    }
  }
  
  const handleDeleteLabel = (index: number) => {
    const _labelList = labelList.concat();
    _labelList.splice(index, 1);
    setLabelList(_labelList);
  }

  useEffect(() => {
    // if(!title || labelList.length == 0) {
    //   setButtonDisabled(true);
    // } else {
      setButtonDisabled(false);
    // }
  },[title, labelList])

  const handleMessageReset = () => {
    setMessage('');
    setErrors([]);
  }

  return (
    <Auth>
      <Layout breadCrumbProps={breadCrumb} propMessage={message} handleMessageReset={handleMessageReset} errors={errors}>
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
          <Input
            labelText="登録する植物（最大20までまとめて記録できます）"
            type="text"
            handleInput={(e) => setLabel(e.target.value)}
            text={label}
            handleAdd={handleAdd}
            onKeyDown={onKeyDown}
            startComposition={startComposition}
            endComposition={endComposition}
            addIcon
            /><br /><br />
          <ul>
          {labelList.map((item, index)=> {
            return <>
            <li key={index} style={{color: primaryColor, display: "flex"}}>
              #{item} <a onClick={() => handleDeleteLabel(index)} key={index}>
                <RemoveCircleOutlineIcon sx={{color: deleteColor, margin: "-1px 0 0 20px", cursor: "pointer"}} /></a>
            </li>
            </>
          })}
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

export default PlantRecord;
