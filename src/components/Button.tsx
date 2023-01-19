import { css, Interpolation, SerializedStyles, Theme } from "@emotion/react";
import { styled } from '@mui/material/styles';
import MuiButton,{ButtonProps} from '@mui/material/Button';
import React, { Children, ReactNode } from "react";

type Props = {
  children: ReactNode;
  handleClick?: () => void;
  disabled?: boolean
};

const Button = (props: Props) => {

const ColorButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
  minWidth: '120px',
  borderRadius: '10px',
  border: 'none',
  padding: '12px 20px',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.9
  },
  "&.Mui-disabled": {
    background: "#ededed",
    color: "#c0c0c0"
  }
}));

  return (
    <ColorButton onClick={props.handleClick} disabled={props.disabled}>
      {props.children}
    </ColorButton>
  );
};

export default Button;
