import React, { ReactNode, useState, useEffect, RefObject, useRef, createRef } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { fetchUsersByName } from "redux/slice/userSlice";
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, plantRecordPage, rootPage } from "constants/pageConstants";
import { css } from '@emotion/react';
import Button from "components/Button";
import Inputs from "components/InputsChild";
import { InnerCss } from "style/common";
import { selectAuthUser } from "redux/slice/authUserSlice";
import { AddCircleOutline } from "@mui/icons-material";
import InputsChild from "components/InputsChild";

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

const LabelTextCss = css`
  padding: 0 0 10px 0;
  display: flex;
`

const Record = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [inputList, setInputList] = useState<any[]>([]);
  const inputRefs = useRef<RefObject<HTMLInputElement>[]>([])

  useEffect(() => {
    const userName = authUser.data?.name;
    if(!userName) {
      return;
    } else {
      dispatch(fetchUsersByName(userName));
    }
  },[authUser, dispatch])

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

  const handleClick = () => {

  }

  const onAddBtnClick = (e: any) => {
    const index = inputList.length
    inputRefs.current[index] = createRef<HTMLInputElement>()
    console.log(index);
    const _inputList = inputList.concat(
    <InputsChild
     type="text" 
     myref={inputRefs.current[index]}
     mykey={index} 
     key={index} />);
    setInputList(_inputList);
  };

  useEffect(() => {
    if(inputRefs.current) {
      console.log(inputList.length)
      console.log(inputRefs.current[inputList.length]?.current?.value);
    }
  },[inputList])


  return (
    <Auth>
      <Layout breadCrumbProps={breadCrumb}>
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
          <div css={LabelTextCss}>
            登録する植物（最大20までまとめて記録できます）
            <a onClick={onAddBtnClick}>
              <AddCircleOutline sx={{margin: "-1px 0 0 4px", cursor: "pointer"}} />
            </a> 
          </div>
          {inputList}
          </div>
          <div css={submitAreaCss}> 
            <Button handleClick={handleClick}>作成</Button>
          </div>
         </div>
        </div>
     </Layout>
    </Auth>
  );
};

export default Record;
