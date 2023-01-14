import { css, Interpolation, Theme } from "@emotion/react";
import React, { Children, ReactNode } from "react";

const InputCss = css`
  background: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px 20px;
  color: inherit;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #D9D9D9;
`;

type Props = {
  children: ReactNode;
  handleClick?: () => void;
};

const SimpleButton = (props: Props) => {
  return (
    <button css={InputCss} onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default SimpleButton;
