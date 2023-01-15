import { css, Interpolation, Theme } from "@emotion/react";
import React, { Children, ReactNode } from "react";

const InputCss = css`
  min-width: 120px;
  background: #5eb476;
  border-radius: 10px;
  border: none;
  padding: 12px 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

type Props = {
  children: ReactNode;
  handleClick?: () => void;
};

const Button = (props: Props) => {
  return (
    <button css={InputCss} onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default Button;
