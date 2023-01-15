import React, { ReactNode, useState, useEffect } from "react";
import Auth  from 'components/Auth';
import Header from "components/Header";
import Footer from "components/Footer";
import { css } from "@emotion/react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRouter } from 'next/router'
import Image from 'next/image';
import SimpleButton from "components/SimpleButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useAppSelector, useAppDispatch } from 'redux/hook';
import { selectAuth } from "redux/slice/authSlice";
import { selectUser, fetchUserById } from "redux/slice/userSlice";
import Divider from "style/Divider";
import { accountPage, accountUpdatePage, recordPage } from "constants/pageConstants";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MainCss = css`
  background: #e7ebe7;
  flex: 1;
`;

const ContentCss = css`
  flex: 1;
  border-radius: 10px;
  background: #fff;
  padding: 16px;
`;

const ContainerCss = {
  display: "flex",
  padding: "32px 0",
  height: "100%",
  "@media screen and (min-width:960px)": {
    width: "960px",
    margin: "0 auto",
  },
};

const AccountInfoCss = css`
  width: 100%;
  height: 500px;
  background: #fff;
`

const CoverCss = css`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 250px;
  background: #E8E8E8;
  @media screen and (min-width:960px){
    width: 960px;
  }
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

const CircleCss = css`
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

const ProfileCss = css `
  @media screen and (min-width:960px){
    width: 960px;
    margin: 0 auto;
  }
  position: relative;
`

const EditCss = css `
  position: absolute;
  right: 0;
  top: 10px;
`

const InfoCss = css`
  padding: 60px 0 30px 30px;
`

const DiscriptionCss = css `
  padding: 10px 0 0 0;
`

const FlowerCss = css`
  display: flex;
`

const ListUlCss = css`
  display: flex;
  li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 180px;
    margin: 0 0 0 20px;
  }
  li:first-child {
    margin: 0;
  }
`;

const borderCss = css `
  margin: 40px 0 0 0;
`
const PlantTitleWrapCss = css `
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Account = ({}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const login = router.query.login;
  const logout = router.query.logout;

  useEffect(()=>{
    if(login || logout) {
      setOpen(true);
    }
  },[login, logout])

  useEffect(() => {
    const userId = auth.userId;
    if(!userId) {
      return;
    } else {
      dispatch(fetchUserById(userId));
    }
  },[auth.userId, dispatch])

  return (
    <Auth>
      <Header />
      <div css={AccountInfoCss}>
        <div css={CoverCss}>
          <div css={bgCircleCss}>
            <div css={CircleCss}>
              <Image src={user.data?.coverImage ?? ""} objectFit='cover' alt="profile image" layout='fill' />
            </div>
          </div>
            <Image src={user.data?.profileImage ?? ""} objectFit='cover' alt="profile image" layout='fill' />
          </div>
          <div css={ProfileCss}>
            <div css={EditCss}>
              <SimpleButton handleClick={() => router.replace(accountUpdatePage.path)}>編集</SimpleButton>
            </div>
            <div css={InfoCss}>
              <span>{user.data?.name}</span><br />
              <span>フォロー 0 </span>
              <span>フォロワー 0</span>
              <p css={DiscriptionCss}>{user.data?.description}</p>
            </div>
          </div>
      </div>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: '100%', background: "#5EB476", color: "#fff", fontWeight: "bold" }}>
          { login ? "ログインしました" : <></>}
          { logout ? "ログアウトしました" : <></>}
        </Alert>
      </Snackbar>
      <main css={MainCss}>
        <div css={ContainerCss}>
          <div css={ContentCss}>
          <div css={PlantTitleWrapCss}>
            <h2>持っている植物 🪴</h2>
            <SimpleButton handleClick={() => router.replace(recordPage.path)}>{recordPage.text}</SimpleButton>
          </div>
          <p css={FlowerCss}>植物を追加<AddCircleOutlineIcon style={{"margin": "-1px 0 0 5px"}} /></p>
          <ul css={ListUlCss}>
            <li>
              <Image
                src="/images/image1.jpg"
                width={180}
                height={180}
                alt="植物"
                css={{ objectFit: "cover" }}
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={180}
                height={180}
                alt="植物"
                css={{ objectFit: "cover" }}
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={180}
                height={180}
                alt="植物"
                css={{ objectFit: "cover" }}
              /><br />
              <span>2022/12/15-</span>
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={180}
                height={180}
                alt="植物"
                css={{ objectFit: "cover" }}
              /><br />
              <span>2022/12/15-</span>
            </li>
          </ul>
          <Divider propCss={borderCss} />
          <h2>以前 🗓</h2>
          <h3>~2022/12</h3>
          <ul css={ListUlCss}>
            <li>
              <Image
                src="/images/image1.jpg"
                width={180}
                height={180}
                alt="植物"
                css={{ objectFit: "cover" }}
              /><br />
              <span>2021/05/15 - 2022/12/15</span>
            </li>
          </ul>
          </div>
        </div>
      </main>
      <Footer />
    </Auth>
  );
};

export default Account;
