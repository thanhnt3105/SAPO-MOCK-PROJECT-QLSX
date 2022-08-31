import React from "react";
import { Snackbar } from "@mui/material";
import {Alert} from '@material-ui/lab'

const Notification = (props) => {
  const {notify,setNotify} =props;

  return (
    <Snackbar
    open={notify.isOpen}
    autoHideDuration={3000}
    >
      <Alert severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification