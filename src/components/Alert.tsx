import React from "react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from "@mui/material";

const CustomeAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  message?: string
  handleBarClose: () => void
  handleCloseAlert: () => void
  open: boolean
}

const Alert = ({message, handleBarClose, open, handleCloseAlert}: Props) => {
  return(
    <Snackbar
    open={open}
    onClose={handleBarClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <CustomeAlert
    onClose={handleCloseAlert}
    severity="success"
    sx={{ width: '100%', background: "#5EB476", color: "#fff", fontWeight: "bold" }}>
    { message ?? <></>}
  </CustomeAlert>

  </Snackbar>
  )
}

export default Alert;