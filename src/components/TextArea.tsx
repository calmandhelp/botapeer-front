import { css, Interpolation, Theme } from "@emotion/react";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const InputCss = css`
  width: 100%;
  min-height: 100px;
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

const TextArea = (props: Props) => {

  return (
    <>
    <div css={LabelTextCss}>{props?.labelText}</div>
    <textarea
      css={InputCss}
      value={props.text}
      onChange={props.handleInput}
      name={props.name}
      onKeyDown={props.onKeyDown}
      maxLength={250}
    />
    </>
  );
};

export default TextArea;
