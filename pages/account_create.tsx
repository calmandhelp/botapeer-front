import { useState, useEffect } from "react";
import Input from "components/Input";
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountCreatePage, accountPage, passwordUpdatePage, rootPage } from "constants/pageConstants";
import { css } from '@emotion/react';
import Button from "components/Button";
import { Error } from "util/redux/apiBaseUtils";
import { selectAuthUser, updateAuthUserPassword } from "redux/slice/authUserSlice";
import PersistLogin from "components/PersistLogin";
import { signUp } from "redux/slice/authSlice";

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
const AccountCreateView = ({}) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const [message, setMessage] = useState('');

  const [disabled, setDisabled] = useState(true);

  const currentPage = {
    label: accountCreatePage.text
  }

  const breadCrumb = {
    currentPage: currentPage
  }

  const handleClick = async () => {
    const signUpResultAction = await dispatch(signUp({name, password, email}));
      if(signUp.fulfilled.match(signUpResultAction)) {
          setMessage("登録しました");
      } else {
        if(signUpResultAction.payload) {
        } else {
          setErrors(JSON.parse(signUpResultAction.error.message as any).errors);
        }
      }
  }

  useEffect(() => {
    if(name != '' && password != '' && email != '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  },[name, password, email])

  return (
    <PersistLogin>
      <Layout breadCrumbProps={breadCrumb} propMessage={message} errors={errors}>
        <div css={WrapCss}>
        <h2>{accountCreatePage.text}</h2>
        <Divider />
        <div css={InnerCss}>
          <div css={InputsCss}>
            <Input
            labelText="名前"
            type="text"
            handleInput={(e) => setName(e.target.value)}
            text={name ?? ""}
            /><br /><br />
            <Input
            labelText="パスワード(8文字以上20文字以内)"
            type="password"
            handleInput={(e) => setPassword(e.target.value)}
            text={password ?? ""}
            /><br /><br />
            <Input
            labelText="メールアドレス"
            type="text"
            handleInput={(e) => setEmail(e.target.value)}
            text={email ?? ""}
            /><br /><br />
          </div>
          <div css={submitAreaCss}> 
            <Button handleClick={handleClick} disabled={disabled}>登録</Button>
          </div>
        </div>
        </div>
      </Layout>
    </PersistLogin>
  );
};

export default AccountCreateView;
