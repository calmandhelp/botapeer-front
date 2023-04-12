import { css } from "@emotion/react";
import React from "react";

const FooterCss = css`
  padding: 32px;
  background:#fff; 
`;

const ContainerCss = {
  "@media screen and (min-width:960px)": {
    width: "960px", 
    margin: "0 auto",
  },
}

const Footer = ({}) => {
  return (
    <footer css={FooterCss}>
      <div css={ContainerCss}>
      {/* <ul>
        <li>よくある質問</li>
        <li>お問合せ</li>
      </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
