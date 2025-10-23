import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../../firebase";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Header from "../additionalDetails/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Button } from "@mui/material";
import underDevelopment from "../../assets/underDevelopment.svg";
import SideNavBar from "./components/SideNavBar";
import UnfinishedOnboarding from "./components/UnfinishedOnboarding";
import ProcessOnboarding from "./components/ProcessOnboarding";
import CreateProject from "./components/CreateProject";
import DisplayProject from "./components/DisplayProject";
import ProjectCreateDetails from "./components/ProjectCreateDetails";
import OtherServices from "./components/OtherServices";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import * as authActions from "../../store/auth";
import * as projectActions from "../../store/project";
import config from "../../config/config";
import logoutImg from "../../assets/logout.svg";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state?.auth);
  const token = useSelector((state) => state?.auth?.token);
  const completeOnboarding = useSelector(
    (state) => state?.auth?.completeOnboarding
  );
  const logout = async (e) => {
    e.preventDefault();
    const company = await dispatch(authActions.logoutSuccess());
    navigate("/login");
  };

  useEffect(() => {
    async function fetchData() {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ` + token?.idToken,
          "Content-Type": "application/json", // Adjust content type according to your API requirements
        },
      };
      try {
        const response = await axios
          .get(config.projectUrl + "fetch-project", axiosConfig)
          .then((response) => response)
          .then(async(result) => {
            setData(result?.data);
            await dispatch(projectActions.saveProject(result?.data));
            await dispatch(projectActions.projectSummarySaveDraft({ProjectSummary : result?.data[0]?.ProjectSummary}));
            await dispatch(projectActions.projectBasicData({BasicData : result?.data[0]?.BasicData}));
            await dispatch(projectActions.projectDataSuccessDraft({ProjectQuestion : result?.data[0]?.ProjectQuestion}));
          })
          .catch((error) => {
            console.log('error', error)
            if (!error.withCredentials ) {
              // Trigger logout action
              console.log('error', error)
              dispatch(authActions.logoutSuccess());
              navigate(
                '/login'
              )
            } else {
              console.error("Error submitting form:", error);
            }
          }
          );

        // Optionally, you can reset the form fields after successful submission

        // Add any success handling logic here, such as showing a success message
      } catch (error) {
        console.error("Error submitting form:", error?.status);
        // Add error handling logic here, such as showing an error message
      }
    }
    if (completeOnboarding) {
      fetchData();
    } else {
      fetchData();
    }
  }, []);
  return (
    <>
      <SideNavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "110px",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            paddingTop: "16px",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            width: "100%",
            paddingRight: "24px",
            gap: 1,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { md: "36px", xs: "24px" },
              fontWeight: "700",
              letterSpacing: ".9px",
              lineHeight: "48.6px",
            }}
          >
            Welcome, {user?.user?.displayName} Your onboarding is in progress
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={(e) => logout(e)}
              startIcon={<img src={logoutImg} />}
              sx={{
                textTransform: "none",
                fontWeight: "500",
                fontSize: "14px",
                height: "48px",
              }}
            >
              Logout
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/lets-chat")}
              startIcon={<PhoneInTalkIcon />}
              sx={{
                textTransform: "none",
                fontWeight: "500",
                fontSize: "14px",
                height: "48px",
              }}
            >
              Contact support
            </Button>
          </Box>
        </Box>
        <UnfinishedOnboarding />
        <ProcessOnboarding data={data} />
        {data?.length === 0 &&  <CreateProject />}
        {data?.length > 0 && data[0]?.status === 'draft' &&  <CreateProject />}
        {data?.length > 0 && data[0]?.status === 'complete' && <DisplayProject data={data} />}
        <ProjectCreateDetails />
        <OtherServices />
      </Box>
    </>
  );
}
export default Dashboard;
