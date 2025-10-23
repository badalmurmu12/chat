import React, { ReactElement, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Backdrop,
  IconButton,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Close from "../../../../assets/close.svg";
import * as projectActions from "../../../../store/project";
function AnalyticsHeader() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const handleClose = async () => {
    
    const authdata = await dispatch(projectActions.closeAnalyticBackdrop());
  };
  return (
    <Box sx={{position:"absolute", backgroundColor:"#fff", width:"40%", zIndex:2001}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop:"16px" }}>
        <Typography variant="h4" sx={{ color: "#12190F", fontWeight:"700", fontSize:"22px", letterSpacing:"0.9px" }}>
        Analytical data
        </Typography>
        <IconButton aria-label="delete" size="small" onClick={handleClose}>
          <Box>
            <img src={Close} height={"24px"} />
          </Box>
        </IconButton>
      </Box>
      <Box pt={1}>
      </Box>
    </Box>
  );
}

export default AnalyticsHeader;
