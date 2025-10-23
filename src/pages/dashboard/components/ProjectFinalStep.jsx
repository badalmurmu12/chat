import React, { ReactElement, useState } from "react";
import axios from "axios";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Backdrop,
  IconButton,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../../../components/textField/TextField";
import InputEdit from "../../../components/input/InputEdit";
import * as projectActions from "../../../store/project";
import { countries } from "../../../utils/country";
import UploadDocuments from "./UploadDocuments";
import config from "../../../config/config";

function ProjectFinalStep() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [summary, setSummary] = useState("");
  const [url, setUrl] = useState("");
  const project = useSelector((state) => state.project);
  const token = useSelector((state) => state?.auth?.token);
  const projectFetch = useSelector((state) => state?.project?.projectFetch);
  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const onBack = async () => {
    const questionback = await dispatch(
      projectActions.projectFinalBack({
        additionalQuestion: true,
        finalSteps: false,
      })
    );
  };

  const saveToLlm = async () => {
    let check = false;
    if (url?.length > 0) {
      check = true;
    }
    if (!project?.fileSentTollm) {
      const summarydata = await dispatch(
        projectActions.projectSummarySuccess({
          ProjectSummary: summary,
          Url: url,
          fileSentTollm: check,
          summaryData: true,
        })
      );
    } else {
      const summarydata = await dispatch(
        projectActions.projectSummarySuccess({
          ProjectSummary: summary,
          Url: url,
          fileSentTollm: false,
          additionalQuestion: true,
          summaryData: false,
        })
      );
    }
  };

  const saveProject = async (type) => {
    // const summarydata = await dispatch(
    //   projectActions.projectDataSuccess({
    //     ProjectSummary: summary,
    //     Url: url,
    //     fileSentTollm: false,
    //     additionalQuestion: true,
    //     summaryData: false,
    //   })
    // );

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ` + token?.idToken,
        "Content-Type": "application/json", // Adjust content type according to your API requirements
      },
    };
    let data = {
      status: type,
      BasicData: project?.BasicData,
      ProjectSummary: project?.ProjectSummary,
      ProjectQuestion: project?.ProjectQuestion,
    };
    const projectData = await dispatch(
      projectActions.projectDataSave({
        status: type,
        BasicData: project?.BasicData,
        ProjectSummary: project?.ProjectSummary,
        ProjectQuestion: project?.ProjectQuestion,
      })
    );
    if (
      projectFetch &&
      projectFetch?.status === "draft"
    ) {
      data = { ...data, UUID: projectFetch?.UUID };
    }
    const raw = JSON.stringify(data);
    debugger
    try {
      const response = await axios.post(
        config.projectUrl + "add-project",
        raw,
        axiosConfig
      );
      if(type === 'complete'){ 
      const contactUs = await dispatch(projectActions.contactUs({}));
      }

      // Optionally, you can reset the form fields after successful submission

      // Add any success handling logic here, such as showing a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Add error handling logic here, such as showing an error message
    }
  };

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "calc(100vh - 140px)",
        }}
      >
        <Box>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
            >
              1. Project name and description
            </Typography>
            <Typography
              variant="p"
              sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
            >
              {project?.BasicData?.ProjectName}
            </Typography>
            <Typography
              variant="p"
              sx={{ color: "#797979", fontWeight: "500", fontSize: "16px" }}
            >
              {project?.ProjectSummary?.ProjectSummary}
            </Typography>
          </Box>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
            >
              2. Project Location
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
            >
              {project?.BasicData?.ProjectLocation}
            </Typography>
          </Box>

          <Box
            sx={{
              pt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
            >
              3. Project Stage
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
            >
              {project?.BasicData?.ProjectStage}
            </Typography>
          </Box>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
            >
              4. Financing amount sought
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
            >
              {project?.ProjectQuestion?.q1}
            </Typography>
          </Box>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
            >
              5. Expected payback period
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
            >
              {project?.ProjectQuestion?.payback}
            </Typography>
          </Box>

     
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, pt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              width: "15%",
              fontSize: "20px",
            }}
            onClick={onBack}
            startIcon={<ArrowBackIcon />}
          ></Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => saveProject('draft')}
            sx={{
              textTransform: "capitalize",
              width: "30%",
              fontSize: "20px",
            }}
          >
            Save Draft
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              textTransform: "capitalize",
              width: "100%",
              fontSize: "20px",
            }}
            onClick={() => saveProject('complete')}
          >
            Finish
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default ProjectFinalStep;
