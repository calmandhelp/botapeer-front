import { useState, useEffect, Context } from "react";
import Auth  from 'components/Auth';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, plantRecordPage, rootPage } from "constants/pageConstants";
import { css } from '@emotion/react';
import { Error } from "util/redux/apiBaseUtils";
import { selectAuthUser, updateAuthUserPassword } from "redux/slice/authUserSlice";
import { API_BASE_URL } from "constants/apiConstants";
import { GetServerSidePropsContext } from "next";
import { PlantRecord } from "model/plantRcord";
import PersistLogin from "components/PersistLogin";
import { fetchUserByPlantRecordId, selectUser } from "redux/slice/userSlice";
import Image from "next/image";

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
type Props = {
  plantRecord: PlantRecord
}  

const PlantRecordView = ({plantRecord}: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [errors, setErrors] = useState<Error[]>([]);

  const childPages = [
    
    {
    href: rootPage.path + user.data?.name,
    label: user.data?.name ? user.data?.name + "さんの" + accountPage.text : "",
    }
  ]

  const currentPage = {
    label: plantRecord.title ?? ""
  }

  const breadCrumb = {
    childPages: childPages,
    currentPage: currentPage
  }

  useEffect(() => {
    if(plantRecord.id) {
      dispatch(fetchUserByPlantRecordId(plantRecord.id))
    }
  },[])

  return (
    <PersistLogin>
      <Layout breadCrumbProps={breadCrumb} errors={errors}>
        <div css={WrapCss}>
          <div style={{width: "500px", margin: "0 auto"}}>
            <h2>{plantRecord.title}</h2>
          </div>
        <Divider width="500px" margin="0 auto" />
         <div css={InnerCss}>
          <div style={{position: "relative", width: "500px", height: "500px", margin: "0 auto"}}>
         <Image
                src="/images/image1.jpg"
                alt="植物"
                layout="fill"
              />
          </div>
         </div>
        </div>
     </Layout>
    </PersistLogin>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { plant_record } = context.query;
  const res = await fetch(API_BASE_URL + "/api/plant_records/" + plant_record);
  const data = await res.json()
  
  if(!data) {
    return {
      notFound: true
    }
  }
  return { props: { plantRecord: data } }
}

export default PlantRecordView;
