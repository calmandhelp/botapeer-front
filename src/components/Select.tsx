import { css, Interpolation, Theme } from "@emotion/react";
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';
import { backgroundColor } from "style/Theme";
import MenuItem from '@mui/material/MenuItem';

const SelectCss = {
  background: backgroundColor,
  borderRadius: "5px",
}

const titleTextCss = css`
  padding: 0 0 10px 0;
  display: flex;
`
export type Option = {
  value: number,
  label: string
}

type InputProps = {
  handleChange: (e: any) => void;
  titleText?: string;
  mykey?: number
  style?: Interpolation<Theme>
  options: Option[]
  value: number
};

const Select = (props: InputProps) => {
  
  return (
    <>
    <div css={titleTextCss}>
      {props?.titleText}
    </div>
    <FormControl sx={SelectCss} fullWidth>
      <MuiSelect
        value={props.value}
        onChange={props.handleChange}
        >
        {props.options.map((op, index) => {
          return <MenuItem value={op.value} key={index}>{op.label}</MenuItem>
        })}
      </MuiSelect>
    </FormControl>
    </>
  );
};

export default Select;