import React, { ReactNode, useState, useEffect } from "react";
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
import Divider from "style/Divider";
import { accountUpdatePage, createPlantRecordPage, plantRecordPage } from "constants/pageConstants";
import { IMAGE_PATH } from "constants/appConstants";
import IsLoginUser from "components/IsLoginUser";
import { User } from "model/user";
import { API_BASE_URL } from "constants/apiConstants";
import { fetchPlantRecordByUserId, selectPlantRecord } from "redux/slice/plantRecordSlice";
import PersistLogin from "components/PersistLogin";
import Link from "next/link";
import { UserResponse } from "botapeer-openapi/typescript-axios";

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
const ListUlCss = css`
  display: flex;
  flex-wrap: wrap;
  li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 180px;
    margin: 0 0 0 20px;
  }
  li:first-of-type {
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

type Props = {
  user: UserResponse
}

const AccountView = ({user}: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const auth = useAppSelector(selectAuth);
  const plantRecords = useAppSelector(selectPlantRecord);
  const dispatch = useAppDispatch();
  const login = router.query.login;
  const logout = router.query.logout;

  useEffect(()=>{
    if(login || logout) {
      setOpen(true);
    }
  },[login, logout])

  useEffect(() => {
    if(user?.id) {
      dispatch(fetchPlantRecordByUserId(user?.id))
    }
  },[user, dispatch])

  const makePlantRecord = () => {
    if(plantRecords) {
      const plantRecordsData = plantRecords?.data;
      if(Array.isArray(plantRecordsData)) {
        return plantRecordsData?.map((plantRecord, index) => {
          const plantRecordId = plantRecord?.id ? plantRecord?.id.toString() : ""
            if(plantRecord?.posts == undefined || plantRecord?.posts?.length == 0) {
              return <li key={index}>
                <Link href={plantRecordPage.path + plantRecordId}>
                <Image
              src={"/images/no_image.jpg"}
              width={180}
              height={180}
              alt="植物"
              css={{ objectFit: "cover", cursor: "pointer" }}
              /></Link></li>
            } else {
              const latestPost = plantRecord?.posts.reduce((prev, current) => ((prev?.id ?? 0) > (current?.id ?? 0) ? prev : current));
              return <li key={index}>
                <Link href={plantRecordPage.path + plantRecordId}>
                <Image
              src={IMAGE_PATH + latestPost.imageUrl ?? "/images/no_image.png"}
              width={180}
              height={180}
              alt="植物"
              css={{ objectFit: "cover", cursor: "pointer" }}
              /></Link></li>
            }
        })
      }
    }
  }

  return (
    <PersistLogin>
      <>
      <Header />
      <div css={AccountInfoCss}>
        <div css={CoverCss}>
          <div css={bgCircleCss}>
            <div css={CircleCss}>
            {user?.profileImage ?
              <Image src={user?.profileImage ? IMAGE_PATH + user?.profileImage : ""} objectFit='cover' alt="profile image" layout='fill' />
              : null}
            </div>
          </div> 
            {user?.coverImage ?
            <Image src={IMAGE_PATH + user?.coverImage} objectFit='cover' alt="cover image" layout='fill' />
            : null}
          </div>
          <div css={ProfileCss}>
            <div css={EditCss}>
              <IsLoginUser isLoginUser={auth.userId== user?.id}>
                <SimpleButton handleClick={() => router.push(accountUpdatePage.path)}>編集</SimpleButton>
              </IsLoginUser>
            </div>
            <div css={InfoCss}>
              <span>{user?.name}</span><br />
              <span>フォロー 0 </span>
              <span>フォロワー 0</span>
              <p css={DiscriptionCss}>{user?.description}</p>
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
            <IsLoginUser isLoginUser={auth.userId== user?.id}>
            <SimpleButton handleClick={() => router.push(createPlantRecordPage.path)}>{createPlantRecordPage.text}</SimpleButton>
            </IsLoginUser>
          </div>
          <ul css={ListUlCss}>
            {makePlantRecord()}
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
              />
            </li>
          </ul>
          </div>
        </div>
      </main>
      <Footer />
      </>
    </PersistLogin>
  );
};

export async function getServerSideProps({ query }: any) {
  const username = query.account
  const res = await fetch(API_BASE_URL + "users?username=" + username);
  const data = await res.json()
  
  if(data.length == 0) {
    return {
      notFound: true
    }
  }
  return { props: { user: data[0] } }
}

export default AccountView;
