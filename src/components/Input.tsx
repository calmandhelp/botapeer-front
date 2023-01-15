import { css, Interpolation, Theme } from "@emotion/react";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const InputCss = css`
  width: 100%;
  display: block;
  background: #ededed;
  border: none;
  border-radius: 5px;
  padding: 15px;
`;

const LabelTextCss = css`
  padding: 0 0 10px 0;
`

type Props = {
  type: string;
  style?: Interpolation<Theme>;
  name?: string;
  handleInput: (e: any) => void;
  text: string;
  onKeyDown?: (e: any) => void;
  labelText?: string;
};

const Input = (props: Props) => {

  return (
    <>
    <div css={LabelTextCss}>{props?.labelText}</div>
    <input
      type={props.type}
      css={InputCss}
      value={props.text}
      onChange={props.handleInput}
      name={props.name}
      onKeyDown={props.onKeyDown}
    />
    </>
  );
};

export default Input;
