import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../additionalDetails/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Button, Avatar, CircularProgress } from "@mui/material";
import underDevelopment from "../../assets/underDevelopment.svg";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AddIcon from '@mui/icons-material/Add';
import PropTypes from "prop-types";

import * as authActions from "../../store/auth";
import * as projectActions from "../../store/project";
import logoutImg from "../../assets/logout.svg";
import AllProjectss from './components/AllProjects/AllProjects';
import SearchProjectHeader from "./components/SearchProjectHeader/SearchProjectHeader";
import SearchProjectHeaderLanding from "./components/SearchProjectHeader/SearchProjectHeaderLanding";



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function NewProjects() {
  const { uuid } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = React.useState(0);
  const [parsedData, setParsedData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const project = useSelector((state) => state?.project);
  const projectdata = useSelector((state) => state?.project?.projectBasicData);
  const token = useSelector((state) => state?.auth?.token);

  const logout = async (e) => {
    e.preventDefault();
    const company = await dispatch(authActions.logoutSuccess());
    navigate("/login");
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let newTimeline = useSelector((state) => state?.project?.newTimeline);
  if (newTimeline && typeof (newTimeline) === 'string') {
    newTimeline = JSON.parse(newTimeline);
  }
  useEffect(() => {
    async function fetchProjectData() {

    }

    fetchProjectData();
  }, [uuid, user.token]);

  useEffect(() => {
    async function fetchProjectAirData() {

    }
    fetchProjectAirData();
  }, [uuid, user.token]);

  useEffect(() => {
    async function fetchTimelineData() {
      if (!uuid) return;
      if (user && user.token) {

      }
    }
    fetchTimelineData();
  }, [uuid, user.token]);



  const createProject = async () => {
    const authdata = await dispatch(projectActions.openBackdrop());
  };

  return (
    <>
      <SearchProjectHeaderLanding />
      <Box sx={{
        maxwidth: "1400px", width: "calc(100% - 48px)", margin: "auto",
        padding: "24px",
        display: "flex", justifyContent: "center", alignItems: "center",
        flexDirection: "column"
      }}>
        <Box sx={{ display: "flex",flex:1,width:"100%", flexDirection:"column", justifyContent: "flex-start",  alignItems:"flex-start" }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 400, fontSize: "24px" }}>
            Top Companies
          </Typography>
          <AllProjectss />

        </Box>

      </Box>

    </>
  );
}
export default NewProjects;


{/* <Box sx={{ flex: "0 0 25%", padding: "16px" }}></Box> */ }


// !error && !project?.loading && project?.companyProfile &&
