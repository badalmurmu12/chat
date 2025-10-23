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
import * as projectActions from "../../../store/project";
import { countries } from "../../../utils/country";
import UploadDocuments from "./UploadDocuments";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import * as authActions from "../../../store/auth";
import appointment from "../../../assets/appointment.png";
import config from "../../../config/config";

function ProjectConnectWithUs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [summary, setSummary] = useState("");
  const [url, setUrl] = useState("");
  const project = useSelector((state) => state.project);
  const token = useSelector((state) => state?.auth?.token);
  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
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

  const goToDashboard = async() =>{
    const summarydata = await dispatch(
      projectActions.projectSummarySuccess({
        contactUs: false,
        openBackdrop: false,
      })
    );
      navigate("/");
  
  }

  const saveProject = async () => {
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
        Authorization: `Bearer ` + token?.oauthIdToken,
        "Content-Type": "application/json", // Adjust content type according to your API requirements
      },
    };
    const data = {
      empty: true,
      additionalProp1: {
        ProjectName: project?.ProjectName,
        ProjectLocation: project?.ProjectLocation,
        ProjectStage: project?.ProjectStage,
        ProjectSummary: project?.ProjectSummary,
      },
      additionalProp2: {},
      additionalProp3: {},
    };
    const raw = JSON.stringify(data);

    try {
      const response = await axios.post(
        config.projectUrl + "add-project",
        raw,
        axiosConfig
      );
      const finance = await dispatch(
        projectActions.goToDashboard({
          additionalQuestion: true,
        })
      );

      // Optionally, you can reset the form fields after successful submission

      // Add any success handling logic here, such as showing a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Add error handling logic here, such as showing an error message
      const contactUs = await dispatch(
        projectActions.contactUs({
          additionalQuestion: false,
        })
      );
    }
  };

  const onClickChat = async() => {
    const tnc = await dispatch(
      authActions.getStarted("Due Diligence Support Dashboard")
    );
    navigate("/lets-chat");
  }

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "calc(100vh - 240px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "500px",
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              pl: 4,
              pr: { md: 5, xs: 1 },
              height: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <Box
                sx={{
                  height: "200px",
                  display: { xs: "flex", md: "flex" },
                  justifyContent: "center",
                }}
              >
                <img src={appointment} height="200px" />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column",alignItems:"center", gap: "8px" }}
              >
                <Typography
                  component="h4"
                  variant="h4"
                  sx={{
                    color: "#000000",
                    fontSize: "24px",
                    fontWeight: "700",
                    letterSpacing: "0.8px",
                  }}
                >
                  Contact Us
                </Typography>
                <Typography
                  component="p"
                  variant="p"
                  sx={{
                    color: "#ABABAB",
                    fontSize: "14px",
                    fontWeight: "600",
                    width: "70%",
                    lineHeight: "18px",
                    fontFamily: "Satoshi-Light",
                    letterSpacing: "0.8px",
                  }}
                >
                  At Refy, we understand that each developer's needs are unique,
                  and we're committed to providing personalised financing
                  solutions to help you achieve your goals. Once you've selected
                  your preferred financing option(s), our team will work closely
                  with you to tailor a funding plan that maximises the potential
                  of your sustainability-linked projects.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  width: { sm: "550px", xs: "100%" },
                }}
              >
                {" "}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    width: { xs: "90%", md: "50%" },
                  }}
                  onClick={ onClickChat}
                  startIcon={<DateRangeOutlinedIcon />}
                >
                  Contact us
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    width: { xs: "90%", md: "50%" },
                  }}
                  onClick={goToDashboard }
                  endIcon={<ArrowForwardIcon />}
                >
                  Go to Project
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default ProjectConnectWithUs;
