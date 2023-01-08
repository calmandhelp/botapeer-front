import { css } from "@emotion/react";
import React from "react";

const FooterCss = css`
  padding: 32px;
`;

const Footer = ({}) => {
  return (
    <footer css={FooterCss}>
      <ul>
        <li>よくある質問</li>
        <li>お問合せ</li>
      </ul>
    </footer>
  );
};

export default Footer;
