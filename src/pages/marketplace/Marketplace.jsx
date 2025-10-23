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
import refy from "../../assets/Refy.png";
import search from "../../assets/search.svg";
import systemI from "../../assets/system.svg";
import alpT from "../../assets/alpT.svg";
import pinnacle from "../../assets/pinnacle.svg";
import zenith from "../../assets/zenith.svg";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ProjectCard from './Project';

const projectDemo = [
  {
    id: 1,
    title: 'ALP Technologies',
    projectType: 'Battery',
    location: 'London, UK',
    budget: '$10M-$50M',
    imageUrl: alpT, // Replace with actual image URL
    path: '/alp'
  },
  {
    id: 2,
    title: 'Pinnacle',
    projectType: 'Renewable Energy, Water Conservation',
    location: 'Singapore',
    budget: '$500K',
    imageUrl:  pinnacle,
    path: '/pinnacle' // Replace with actual image URL
  },
  {
    id: 3,
    title: 'Zenith',
    projectType: 'Solar',
    location: 'Luzon, Philippines',
    budget: '$8M',
    imageUrl:  zenith, // Replace with actual image URL
    path: '/demo'
  }
];



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

function Marketplace() {
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
 

  const handleCardClick = (path) => {
    navigate(path);
  };

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
      <Box sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#007474", alignItems: "center"
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "43px", height: "calc(100vh - 32px)", margin: "8px", backgroundColor: "#fff", borderRadius: "8px", gap: 1, }}>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "8px", cursor: "pointer" }}>
            <img src={refy} height={32} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "8px" }}>
            <img src={search} height={24} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: "8px" }}>
            <img src={systemI} height={24} />
          </Box>
          
          <Box sx={{ display: "flex", justifyContent: "center", padding: "8px" , marginTop: 'auto',
          cursor: 'pointer',}} onClick={logout}>
            <img src={logoutImg} height={24} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "calc(100% - 59px )", height: "calc(100vh - 32px)", margin: "8px", backgroundColor: "#fff", borderRadius: "8px", gap: 1, }}>
          <Box pt={1.5} pl={2} pb={1}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
              <Typography sx={{ color: "#000000", fontFamily: 'Manrope-Bold', fontSize: "22px", letterSpacing: "0.8px", wordSpacing: "1px", fontWeight: '700', }}>
                Project Marketplace
              </Typography>
              <Typography sx={{ color: "#A1A1A1", fontFamily: 'Manrope-Regular', fontSize: "14px", letterSpacing: "0.8px", wordSpacing: "1px", fontWeight: '700', }}>
              Type your queries or select a query from our pre-made Questions our AI will give a personalised solution for you.
              </Typography>
 
            </Box>
          </Box>
          <Box container sx={{display:"flex", gap:2, flexWrap:"wrap"}} spacing={1} pl={2} pt={2}>
            {projectDemo?.map((project) => (
              <Box  key={project.id}>
                <Box onClick={() => handleCardClick(project.path)} sx={{ cursor: 'pointer' }}>
              
                <ProjectCard
                  title={project.title}
                  projectType={project.projectType}
                  location={project.location}
                  budget={project.budget}
                  imageUrl={project.imageUrl}
                />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Marketplace;



