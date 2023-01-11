import { ReactElement, ReactNode } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import { css } from "@emotion/react";

// type LayoutProps = Required<{
//   readonly children: ReactElement;
// }>;

type Props = {
  children?: ReactNode
}

const MainCss = css`
  background: #f4f2ef;
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

export const Layout = ({ children }: Props) => (
  <>
    <Header />
    <main css={MainCss}>
      <div css={ContainerCss}>
        <div css={ContentCss}>{children}</div>
      </div>
    </main>
    <Footer />
  </>
);
