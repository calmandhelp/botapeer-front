import { useState, useEffect } from "react";
import Auth  from 'components/Auth';
import Input from "components/Input";
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, passwordUpdatePage, rootPage } from "constants/pageConstants";
import { accountUpdatePage } from 'constants/pageConstants';
import { css } from '@emotion/react';
import Button from "components/Button";
import { Error } from "util/redux/apiBaseUtils";
import { selectAuthUser, updateAuthUserPassword } from "redux/slice/authUserSlice";

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
const AccountUpdate = ({}) => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);

  const childPages = [
    {
    href: rootPage.path + authUser?.data?.name,
    label: accountPage.text,
    },
    {
      href: accountUpdatePage.path,
      label: accountUpdatePage.text,
    }
  ]

  const currentPage = {
    label: passwordUpdatePage.text
  }

  const breadCrumb = {
    childPages: childPages,
    currentPage: currentPage
  }

  const handleClick = () => {
      dispatch(updateAuthUserPassword({currentPassword, newPassword}))
      .unwrap()
      .then(payload => {
        console.log({ payload });
      })
      .catch(error => {
          const errors = JSON.parse(error.message).errors;
          setErrors(errors);
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <Auth>
      <Layout breadCrumbProps={breadCrumb} errors={errors}>
        <div css={WrapCss}>
        <h2>{passwordUpdatePage.text}</h2>
        <Divider />
         <div css={InnerCss}>
          <div css={InputsCss}>
            <Input
            labelText="現在のパスワード"
            type="password"
            handleInput={(e) => setCurrentPassword(e.target.value)}
            text={currentPassword ?? ""}
            /><br /><br />
            <Input
            labelText="新しいパスワード"
            type="password"
            handleInput={(e) => setNewPassword(e.target.value)}
            text={newPassword ?? ""}
            /><br /><br />
          </div>
          <div css={submitAreaCss}> 
            <Button handleClick={handleClick}>更新</Button>
          </div>
         </div>
        </div>
     </Layout>
    </Auth>
  );
};

export default AccountUpdate;
