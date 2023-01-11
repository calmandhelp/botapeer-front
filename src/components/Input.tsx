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

type Props = {
  type: string;
  style?: Interpolation<Theme>;
  name: string;
  handleInput: (e: any) => void;
  text: string;
  onKeyDown?: (e: any) => void;
};

const Input = (props: Props) => {
  const [text, setText] = useState("");

  return (
    <input
      type={props.type}
      css={InputCss}
      value={props.text}
      onChange={props.handleInput}
      name={props.name}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default Input;
