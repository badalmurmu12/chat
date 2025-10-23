import React, { ReactElement, useEffect, useState } from "react";
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
import * as projectActions from "../../../store/project";
import { countries } from "../../../utils/country";
import UploadDocuments from "./UploadDocuments";
import config from "../../../config/config";

function ProjectSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [summary, setSummary] = useState("");
  const [url, setUrl] = useState("");
  const project = useSelector((state) => state.project);
  const projectFetch = useSelector((state) => state?.project?.projectFetch);
  const token = useSelector((state) => state?.auth?.token);
  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  useEffect(() => {
    setSummary(project?.ProjectSummary?.ProjectSummary);
    setUrl(project?.ProjectSummary?.Url);
  }, [project]);
  const saveToLlm = async () => {
    let check = false;
    if (url?.length > 0) {
      check = true;
    }
    // if (!project?.fileSentTollm) {
    //   const summarydata = await dispatch(
    //     projectActions.projectSummarySuccess({
    //       ProjectSummary: { ProjectSummary: summary, Url: url },
    //       fileSentTollm: true,
    //       summaryData: true,
    //     })
    //   );
    // } else {
    //   const summarydata = await dispatch(
    //     projectActions.projectSummarySuccess({
    //       ProjectSummary: { ProjectSummary: summary, Url: url },
    //       fileSentTollm: false,
    //       additionalQuestion: true,
    //       summaryData: false,
    //     })
    //   );
    // }

    const summarydata = await dispatch(
      projectActions.projectSummarySuccess({
        ProjectSummary: { ProjectSummary: summary, Url: url },
        fileSentTollm: false,
        additionalQuestion: true,
        summaryData: false,
      })
    );
  };

  const onBack = async () => {
    // if (!project?.fileSentTollm) {
    //   const summarydata = await dispatch(
    //     projectActions.projectSummaryBack({
    //       basicData: true,
    //       summaryData: false,
    //     })
    //   );
    // } else {
    //   const summarydata = await dispatch(
    //     projectActions.projectSummaryFileBack({
    //       fileSentTollm: false,
    //       summaryData: true,
    //     })
    //   );
    // }

    const summarydata = await dispatch(
      projectActions.projectSummaryFileBack({
        basicData: true,
        summaryData: false,
      })
    );
  };

  const onSaveDraft = async () => {
    let data = {
      status: "draft",
      BasicData: project?.BasicData,
      ProjectSummary: { ProjectSummary: summary, Url: url },
    };
    if (
      projectFetch &&
      projectFetch?.status === "draft"
    ) {
      data = { ...data, UUID: projectFetch?.UUID };
    }

    const summarydata = await dispatch(
      projectActions.projectSummarySaveDraft({
        ProjectSummary: { ProjectSummary: summary, Url: url },
      })
    );

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ` + token?.idToken,
        "Content-Type": "application/json", // Adjust content type according to your API requirements
      },
    };

    const raw = JSON.stringify(data);

    try {
      const response = await axios.post(
        config.projectUrl + "add-project",
        raw,
        axiosConfig
      );

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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pt: 1 }}>
          <TextField
            label="Project Description"
            edit={false}
            value={summary}
            onChange={handleSummaryChange}
          />
          <Box>
            <Typography
              sx={{
                color: "#ABABAB",
                fontFamily: "Satoshi",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Your summary should include:
            </Typography>
            <ul style={{ margin: "0px" }}>
              <li style={{ color: "#387BE0" }}>
                Brief description of the project, its purpose, and the problem
                it aims to solve.
              </li>
              <li style={{ color: "#387BE0" }}>
                List of key partners, suppliers, or stakeholders involved in the
                project.
              </li>
              <li style={{ color: "#387BE0" }}>
                How the project's solution benefits the end customer or meets
                their needs.
              </li>
              <li style={{ color: "#387BE0" }}>
                An estimated timeline for the project, including key milestones
                and deliverables.
              </li>
            </ul>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#12190F", fontSize: "18px", fontWeight: "700" }}
            >
              or
            </Typography>
          </Box>
          <UploadDocuments setUrl={setUrl} />
        </Box>

        {/* {project?.fileSentTollm && (
          <Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, pt: 1 }}
            >
              <TextField
                label="Project Summary"
                edit={true}
                value={summary}
                onChange={handleSummaryChange}
              />
            </Box>
          </Box>
        )} */}

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
            onClick={onSaveDraft}
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
            onClick={saveToLlm}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default ProjectSummary;
