import Head from "next/head";
import { css } from "@emotion/react";
import Image from "next/image";
import { Layout } from "Layout/Layout";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { selectAuth } from "redux/slice/authSlice";
import { useRouter } from 'next/router';

const H3TitleCss = css`
  padding: 5px 0 0 0;
  font-size: 16px;
  font-weight: bold;
`;

const ListCss = css`
  display: flex;
`;

export default function Home() {

  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ボータピア</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          <div>
            <h2>みんなの生育記録</h2>
          </div>
          <div css={H3TitleCss}>
            <h3>花の生育記録</h3>
          </div>
          <ul css={ListCss}>
            <li>
              <Image
                src="/images/image1.jpg"
                width={180}
                height={180}
                alt="植物"
                css={{ objectFit: "cover" }}
              />
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={180}
                height={180}
                alt="植物"
                css={{ objectFit: "cover" }}
              />
            </li>
            <li>
              <Image
                src="/images/image1.jpg"
                width={180}
                height={180}
                alt="植物"
                css={{ objectFit: "cover" }}
              />
            </li>
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
          {/* ユーザー表示とログアウトのサンプルソース。後で使う[TODO] */}
          {/* <div>
          <button
            onClick={async () => {
              await axios.get("http://localhost:8081/api/users");
            }}
          >
            ユーザー表示
          </button>
          <button
            onClick={async () => {
              await axios.get("http://localhost:8081/api/logout", {
                headers: {
                  Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjcyODk5MzE3LCJleHAiOjE2NzI5MDI5MTd9.alG3n-FxpDJCzG5JVhgg8cbhYO2ap_ewDQQzKIyFLZRNVzUUODijhy8m_FDtQoExopVeGlMhQHEjr8D-DnRQag`,
                },
              });
            }}
          >
            ログアウト
          </button>
        </div> */}
        </>
      </Layout>
    </>
  );
}
