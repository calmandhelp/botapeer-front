import { css, Interpolation, Theme } from "@emotion/react";
import { AddCircleOutline } from "@mui/icons-material";
import { CompositionEventHandler, RefObject, useState } from "react";

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
  display: flex;
`

type InputProps = {
  type: string;
  name?: string;
  handleInput: (e: any) => void;
  text: string;
  onKeyDown?: (e: any) => void;
  labelText?: string;
  addIcon?: boolean
  handleAdd?: () => void
  mykey?: number
  style?: Interpolation<Theme>
  myref?: RefObject<HTMLInputElement>
  startComposition?: CompositionEventHandler<HTMLInputElement> | undefined
  endComposition?: CompositionEventHandler<HTMLInputElement> | undefined
};

const Input = (props: InputProps) => {

  const [t, setT] = useState("");

  const change = (e: any) => {
    setT(e.target.value);
  }

  return (
    <>
    <div css={LabelTextCss}>
    {props?.labelText}
    {props.addIcon ?
    <a onClick={props.handleAdd}>
      <AddCircleOutline sx={{margin: "-1px 0 0 4px", cursor: "pointer"}} />
    </a>
    :<></>}
    </div>
    <input
      ref={props.myref}
      key={props.mykey}
      type={props.type}
      css={InputCss}
      value={props.text}
      onChange={props.handleInput}
      onKeyDown={props.onKeyDown}
      onCompositionStart={props.startComposition}
      onCompositionEnd={props.endComposition}
    />
    </>
  );
};

export default Input;
