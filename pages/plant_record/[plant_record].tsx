import { useState, useEffect, Context } from "react";
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, createPlantRecordPage, createPlantRecordPostPage, plantRecordPage, rootPage } from "constants/pageConstants";
import { css } from '@emotion/react';
import { Error } from "util/redux/apiBaseUtils";
import { API_BASE_URL } from "constants/apiConstants";
import { GetServerSidePropsContext } from "next";
import { PlantRecord } from "model/plantRcord";
import PersistLogin from "components/PersistLogin";
import { fetchUserByPlantRecordId, selectUser } from "redux/slice/userSlice";
import Image from "next/image";
import SimpleButton from "components/SimpleButton";
import { useRouter } from "next/router";

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
  plantRecord: PlantRecord
}  

const PlantRecordView = ({plantRecord}: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [errors, setErrors] = useState<Error[]>([]);
  const router = useRouter();

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

  const handleCreatePost = () => {
    router.push(createPlantRecordPage.path + "/" + plantRecord.id + "/" + createPlantRecordPostPage.path);
  }

  return (
    <PersistLogin>
      <Layout breadCrumbProps={breadCrumb} errors={errors}>
        <div css={WrapCss}>
         <div style={{width: "500px", margin: "0 auto"}}>
          <div>
            <h2>{plantRecord.title}</h2>
          </div>
         <Divider />
         <div css={InnerCss}>
         <div css={picInfoCss}>
          <div>{plantRecord.createdAt?.toString()}-</div>
          <SimpleButton handleClick={handleCreatePost}>投稿追加</SimpleButton>
         </div>
          <div style={{position: "relative", width: "500px", height: "500px", margin: "0 auto"}}>
          <Image
              src={"/images/no_image.jpg"}
              width={500}
              height={500}
              alt="植物"
              css={{ layout: "fill" }}
              />
          </div>
          </div>
         </div>
        </div>
     </Layout>
    </PersistLogin>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { plant_record } = context.query;
  const res = await fetch(API_BASE_URL + "plant_records/" + plant_record);
  const data = await res.json()
  
  if(!data) {
    return {
      notFound: true
    }
  }
  return { props: { plantRecord: data } }
}

export default PlantRecordView;
