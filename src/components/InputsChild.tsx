import { css } from "@emotion/react";
import Input from "components/Input";
import { RefObject, useState } from "react";

type Props = {
  type: string;
  onKeyDown?: (e: any) => void;
  mykey?: number
  myref?: RefObject<HTMLInputElement>
};

const LabelTextCss = css`
  padding: 0 0 10px 0;
  display: flex;
`

const InputsChild = (props: Props) => {

  const [label, setLabel] = useState("");
  return (
    <>
    <Input
    key={props.mykey}
    mykey={props.mykey}
    type="text"
    handleInput={(e) => setLabel(e.target.value)}
    text={label}
    onKeyDown={props.onKeyDown}
    myref={props.myref}
    />
    </>
  );
};

export default InputsChild;
