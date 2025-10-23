import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../../firebase";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../additionalDetails/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Button, Avatar, CircularProgress } from "@mui/material";
import {
  set,
  ref,
  getDatabase,
  onValue,
  remove,
  update,
} from "firebase/database";
import underDevelopment from "../../assets/underDevelopment.svg";
import SideNavBar from "../dashboard/components/SideNavBar";
import ProgressBar from "./components/ProgressBar";
import VprogressBar from "./components/VprogressBar/VprogressBar";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as authActions from "../../store/auth";
import * as projectActions from "../../store/project";
import logoutImg from "../../assets/logout.svg";
import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import ContactUs from "./components/ContactsUs/ContactsUs";
import ContentCard from "./components/ContentCard/ContentCard";
import PdfViewer from "./components/PdfViewer";
import Task from "./components/Task/Task";
import DisplayFile from "./components/DisplayFile/DIsplayFile";
import ContactUsPopup from "./components/ContactUsPopup/ContactUsPopup";
import RequestDocumentsPopup from "./components/RequestDocumentsPopup/RequestDocumentsPopup";
import InviteUserPopup from "./components/InviteUserPopup/InviteUserPopup";
import Announcement from "./components/Announcement/Announcement";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";

const docs = [
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20Corporate%20Presentation%20-%202021.pdf?alt=media&token=3b5a038e-a2d9-400d-b8f8-b075321b55f0",
    title: "Detailed business plan outlining our operations, market, and growth strategy",
    type: "pdf",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20Corporate%20Presentation%20-%202021_page-0001.jpg?alt=media&token=53227040-1ee9-4492-b98b-16473289ce3a"
  },
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FNon%20HF%20Recycle%20%20Project%20update%2007%20Apr%20%2024.pptx?alt=media&token=ac72d5a9-1828-4db7-a45b-623334261139",
    title: "Financial projections for the next 3-5 years",
    type: "ppt",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20Corporate%20Presentation%20-%202021_page-0009.jpg?alt=media&token=2f26183a-33f2-45f3-baa2-b63a53e1a28b"
  },
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FREC%20Project%20FInancials_09052024%20(1).xlsx?alt=media&token=56b042b1-4ea1-4374-a7e0-b8f0e065b1d2",
    title: "Financial projections for the next 3-5 years",
    type: "xlx",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20Corporate%20Presentation%20-%202021_page-0030.jpg?alt=media&token=debab239-4e7b-4d78-8a80-eab9190023d0"
  }
]

const singledoc = [
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20-%20Company%20%26%20Business%20Plan%20Oct2023.pdf?alt=media&token=029d8a99-c1d7-4a01-a48a-10e718521b74",
    title: "Detailed business plan outlining our operations, market, and growth strategy",
    type: "pdf",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20Corporate%20Presentation%20-%202021_page-0030.jpg?alt=media&token=debab239-4e7b-4d78-8a80-eab9190023d0"
  }
]
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

function Projects() {
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
  const projectGenAIBasicData = useSelector((state) => state?.project?.projectGenAIBasicData);
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
      if (!uuid) return;
      if (user && user.token) {
        setLoading(true);
        setError(null);



        // const unsubscribe = onValue(projectRef, (snapshot) => {
        //   const data = snapshot.val();

        //   if (data) {
        //     dispatch({
        //       type: 'FETCH_PROJECT_SUCCESS',
        //       payload: data
        //     });
        //     setLoading(false);
        //   } else {
        //     setError('No project data found');
        //     setLoading(false);
        //   }
        // }, (error) => {
        //   setError(error.message);
        //   setLoading(false);
        // });

        // Cleanup function
        // return () => unsubscribe();
      }
    }

    fetchProjectData();
  }, [uuid, user.token]);

  useEffect(() => {
    async function fetchProjectAirData() {
      if (!uuid) return;
      if (user && user.token) {
        let uuidData = {
          "uuid": uuid
        }
        const projectdata = await dispatch(projectActions.informationsDeveloper(uuid));
        // if (!project?.unauthorised && typeof(project?.projectBasicData) === 'string') {
        //   const parsed = JSON.parse(project?.projectBasicData);
        //   setParsedData(parsed);
        // }
      }
    }
    fetchProjectAirData();
  }, [uuid, user.token]);

  useEffect(() => {
    async function fetchProjectData() {
      if (!uuid) return;
      if (user) {
        let uuidData = {
          "uuid": uuid
        }
        const projectdata = await dispatch(projectActions.informationsDeveloperGenAi(uuid));
      }
    }
    fetchProjectData();
  }, [uuid]);

  useEffect(() => {
    async function fetchTimelineData() {
      if (!uuid) return;
      if (user && user.token) {
        const timeline = await dispatch(projectActions.getTimeline(uuid));
      }
    }
    fetchTimelineData();
  }, [uuid, user.token]);


  // useEffect(() => {

  //     try {
  //       const  parsed  = JSON.parse(project?.projectBasicData);
  //       setParsedData(parsed);
  //       setLoading(false);
  //     } catch (e) {
  //       setError("Error parsing project data");
  //       setLoading(false);
  //     }

  // }, [project, error]);

  return (
    <>
      <DisplayFile />
      <ContactUsPopup />
      <RequestDocumentsPopup />
      <InviteUserPopup />
      <Announcement />
      <Header />
      <WelcomeScreen />
      <Box sx={{
        maxwidth: "1400px", width: "100%", margin: "auto",
        display: "flex", justifyContent: "center", alignItems: "center",

      }}>
        {project?.loading ? <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /> </Box> : ""}
        {error ? <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}> {error}</Box> : ""}
        {
          !error && !project?.loading && !project?.unauthorised &&
          <Box sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "center" }}>
            <Box sx={{ width: { xs: "100%", md: "25%" }, padding: "16px" }}>
              <CompanyProfile project={projectdata} />
              <VprogressBar stage={'Planning'} />
              <Box sx={{ padding: "16px 16px", display: "flex", flexDirection: "column", backgroundColor: "#fff", marginTop: "16px", gap: 2, borderRadius: "8px", boxShadow: "0px 0px 4px 0px #E5E5E5" }}>
                <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px", }}>
                  About
                </Typography>
                <Typography sx={{ color: "#9C9C9C", textAlign: "justified" }}>
                  {projectdata?.organisation?.aboutUs}
                </Typography>
              </Box>

            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "16px 0px" }}>
              <ActionButtons />
              {projectGenAIBasicData?.summary?.length > 0 &&
                <Box sx={{ padding: "16px 16px", display: "flex", flexDirection: "column", backgroundColor: "#fff", marginTop: "8px", gap: 2, borderRadius: "8px", boxShadow: "0px 0px 4px 0px #E5E5E5" }}>
                  <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px", }}>
                    Summary
                  </Typography>
                  <Typography sx={{ color: "#9C9C9C", textAlign: "justified" }}>
                    {projectGenAIBasicData?.summary}
                  </Typography>
                </Box>
              }
              {newTimeline?.map((timeline, index) => {
                let timelin = {}
                let contentType = ""
                if (typeof (timeline?.data) === 'string') {
                  timelin = JSON.parse(timeline?.data)
                  // console.log('contentType', timeline?.contentType)
                  // contentType = JSON.parse(timeline?.contentType)

                }
                return (<PdfViewer key={index} contentType={timeline?.contentType} docs={timelin?.files} text={timelin?.text} timestamp={timelin?.timestamp} user={timelin?.user} />
                )
              }).reverse()}
            </Box>

            <Box sx={{ width: { xs: "100%", md: "25%" }, padding: "16px", }}>
              <ContactUs />
              <Task />
            </Box>
          </Box>
        }

        {
          !error && !project?.loading && project?.unauthorised &&

          <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>You are not authorized to view this page. </Box>

        }
      </Box>

    </>
  );
}
export default Projects;


{/* <Box sx={{ flex: "0 0 25%", padding: "16px" }}></Box> */ }


// !error && !project?.loading && project?.companyProfile &&