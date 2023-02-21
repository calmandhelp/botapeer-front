import { useState, useEffect, Context } from "react";
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Layout } from 'Layout/Layout';
import Divider from "style/Divider";
import { accountPage, createPlantRecordPage, createPlantRecordPostPage, makePlantRecordPostPage, plantRecordPage, rootPage } from "constants/pageConstants";
import { css } from '@emotion/react';
import { Error } from "util/redux/apiBaseUtils";
import { API_BASE_URL } from "constants/apiConstants";
import { GetServerSidePropsContext } from "next";
import PersistLogin from "components/PersistLogin";
import { fetchUserByPlantRecordId, selectUser } from "redux/slice/userSlice";
import Image from "components/Image";
import SimpleButton from "components/SimpleButton";
import { useRouter } from "next/router";
import { PlantRecordResponse } from "botapeer-openapi/typescript-axios";
import { toDateTime } from "util/date/dateUtils";
import { IMAGE_PATH } from "constants/appConstants";
import Link from "next/link";

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

const ImageArea = css`
  .nextImage {
    flex-direction: column;
  }
  .nextImage img {
    width: 100%;
  }
  @media screen and (min-width: 960px) {
    display: flex;
    flex-wrap: wrap;
    li {
      height: 165px;
      margin-left: 10px;
      margin-bottom: 10px;
      :nth-child(3n - 2) {
        margin-left: 0px;
      }
    }
  }
`

type Props = {
  plantRecord: PlantRecordResponse
}  

const PlantRecordView = ({plantRecord}: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [errors, setErrors] = useState<Error[]>([]);
  const router = useRouter();

  let latestPost = undefined;
  let sortedPost = undefined;
  console.log(plantRecord);
  if(plantRecord?.posts && plantRecord?.posts.length > 0) {
    latestPost = plantRecord?.posts.reduce((prev, current) => ((prev?.id ?? 0) > (current?.id ?? 0) ? prev : current));
    sortedPost = plantRecord?.posts.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
  }

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
  },[dispatch, plantRecord.id])

  const handleCreatePost = () => {
    router.push(createPlantRecordPage.path + "/" + plantRecord.id + createPlantRecordPostPage.path);
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
          <div>{toDateTime(plantRecord.createdAt ?? "")}-</div>
          <SimpleButton handleClick={handleCreatePost}>投稿追加</SimpleButton>
         </div>
          <div style={{position: "relative", margin: "0 auto"}}>
            <Image
              src={latestPost?.imageUrl ? IMAGE_PATH + latestPost?.imageUrl : "/images/no_image.jpg"}
              width={500}
              height={500}
              alt="植物"
              />
              <ul css={ImageArea}>
              {sortedPost?.map((post, index) => {
                const plantRecordId = plantRecord.id?.toString() ?? "";
                const postId = post.id?.toString() ?? "";
                return (
                  <li key={index}>
                    <Link href={makePlantRecordPostPage(plantRecordId, postId).path}>
                    <Image
                    src={post.imageUrl ? IMAGE_PATH + post.imageUrl : "/images/no_image.jpg"}
                    width={160}
                    height={165}
                    alt="植物"
                    />
                    </Link>
                  </li>
                )
              })}
              </ul>
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