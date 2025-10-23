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
import Radio, { radioClasses } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function ProjectAdditionalQuestions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [summary, setSummary] = useState("");
  const [url, setUrl] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [paybackPeriod, setPaybackPeriod] = useState("");
  const project = useSelector((state) => state.project);
  const projectFetch = useSelector((state) => state?.project?.projectFetch);
  const token = useSelector((state) => state?.auth?.token);
  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handlePaybackChange = (event) => {
    setPaybackPeriod(event.target.value);
  };

  useEffect(() => {
    setQ1(project?.ProjectQuestion?.q1);
    setQ2(project?.ProjectQuestion?.q2);
    setPaybackPeriod(project?.ProjectQuestion?.payback);
  }, [project]);

  const saveToLlm = async () => {
    let check = false;
    if (url?.length > 0) {
      check = true;
    }
    if (!project?.fileSentTollm) {
      const summarydata = await dispatch(
        projectActions.projectSummarySuccess({
          ProjectQuestions: summary,
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

  const handleQ1Change = (event) => {
    setQ1(event.target.value);
  };

  const handleQ2Change = (event) => {
    setQ2(event.target.value);
  };

  const onBack = async () => {
    const questionback = await dispatch(
      projectActions.projectQuestionBack({
        fileSentTollm: true,
        summaryData: true,
        additionalQuestion: false,
      })
    );
  };

  const saveProject = async () => {
    const questiondata = await dispatch(
      projectActions.projectDataSuccess({
        ProjectQuestion: { q1: q1, payback: paybackPeriod },
        fileSentTollm: false,
        additionalQuestion: false,
        summaryData: false,
        finalSteps: true,
      })
    );
  };
  const onSaveDraft = async () => {
    let data = {
      status: "draft",
      BasicData: project?.BasicData,
      ProjectSummary: project?.projectData?.ProjectSummary,
      ProjectQuestion: { q1: q1, payback: paybackPeriod },
    };
    if (
      projectFetch &&
      projectFetch?.status === "draft"
    ) {
      data = { ...data, UUID: projectFetch?.UUID };
    }
    const questiondata = await dispatch(
      projectActions.projectDataSuccessDraft({
        ProjectQuestion: { q1: q1, payback: paybackPeriod },
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
        <Box>
          <Box
            sx={{
              pt: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box pb={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "500",
                  letterSpacing: "1px",
                  fontSize: "18px",
                  color: "#12190f",
                }}
              >
                Questions
              </Typography>
            </Box>
            <label for="financingAmount">
              Financing Amount Sought (In USD)
            </label>
            <input
              type="text"
              id="financingAmount"
              name="financingAmount"
              placeholder=""
              value={q1}
              onChange={handleQ1Change}
            />
          </Box>
          {/* <Box
            sx={{
              pt: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label for="financingAmount">Expected Payback Period</label>
            <input
              type="text"
              id="financingPayback"
              name="financingPayback"
              placeholder=""
              value={q2}
              onChange={handleQ2Change}
            />
          </Box> */}
          <Box sx={{ pt: 2, maxWidth: "500px" }}>
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{ color: "#12190F" }}
              >
                Expected Payback Period
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={paybackPeriod}
                onChange={handlePaybackChange}
              >
                <FormControlLabel
                  value="< 2yrs"
                  control={
                    <Radio
                      sx={{
                        [`&, &.${radioClasses.checked}`]: {
                          color: "#54AAAA",
                        },
                      }}
                    />
                  }
                  label="< 2yrs"
                />
                <FormControlLabel
                  value="2-5 yrs"
                  control={
                    <Radio
                      sx={{
                        [`&, &.${radioClasses.checked}`]: {
                          color: "#54AAAA",
                        },
                      }}
                    />
                  }
                  label="2-5 yrs"
                />
                <FormControlLabel
                  value="5-10 yrs"
                  control={
                    <Radio
                      sx={{
                        [`&, &.${radioClasses.checked}`]: {
                          color: "#54AAAA",
                        },
                      }}
                    />
                  }
                  label="5-10 yrs"
                />
                <FormControlLabel
                  value="10+ yrs"
                  control={
                    <Radio
                      sx={{
                        [`&, &.${radioClasses.checked}`]: {
                          color: "#54AAAA",
                        },
                      }}
                    />
                  }
                  label="10+ yrs"
                />
              </RadioGroup>
            </FormControl>
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
            onClick={saveProject}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default ProjectAdditionalQuestions;
