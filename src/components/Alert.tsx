import React from "react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar, useTheme } from "@mui/material";
import { Error } from "util/redux/apiBaseUtils";
import { ErrorResponse } from "botapeer-openapi/typescript-axios";

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
  errorsResponse?: ErrorResponse
}

const Alert = ({message, handleBarClose, open, handleCloseAlert, errorsResponse}: Props) => {
  return(
    <Snackbar
    open={open}
    onClose={handleBarClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <CustomeAlert
    onClose={handleCloseAlert}
    severity={errorsResponse?.errors?.length == 0 || errorsResponse?.errors == undefined ? "success" : "error"}
    sx={{ width: '100%', background: 'primary', color: "#fff", fontWeight: "bold" }}>
    { message ?? <></>}
    { errorsResponse?.errors?.length != 0 ? errorsResponse?.errors?.map((e)=> {
      return <>{e.message}<br/></>
    }) : <></>}
  </CustomeAlert>
  </Snackbar>
  )
}

export default Alert;