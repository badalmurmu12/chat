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
import Close from "../../../assets/close.svg";
import * as projectActions from "../../../store/project";
function ProjectCreateHeader() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const handleClose = async () => {
    const authdata = await dispatch(projectActions.closeBackdrop());
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ color: "#12190F", fontWeight:"700", letterSpacing:"0.9px" }}>
          {project?.contactUs && "Connect with us"}

          {project?.finalSteps && "Final step"}
          {!project?.contactUs && !project?.finalSteps && "Create project"}
        </Typography>
        <IconButton aria-label="delete" size="small" onClick={handleClose}>
          <Box>
            <img src={Close} height={"32px"} />
          </Box>
        </IconButton>
      </Box>
      <Box pt={1}>
        <Typography
          variant="h6"
          sx={{ color: "#9C9C9C", fontSize: "14px", fontWeight: "500" }}
        >
          {project?.contactUs && "Connect with us for the next steps"}
          {project?.finalSteps &&
            "Check all the details before creating the project"}
          {!project?.contactUs &&
            !project?.finalSteps && !project?.summaryData &&
            "To get started you have to create your very first project Click on create project button to go through the process of creating the project"}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProjectCreateHeader;
