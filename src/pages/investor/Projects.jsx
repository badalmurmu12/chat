import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../../firebase";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import ChatAi from "./components/ChatAi/ChatAi";
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
import Divider from '@mui/material/Divider';
import * as authActions from "../../store/auth";
import * as projectActions from "../../store/project";
import logoutImg from "../../assets/log-out.svg";
import Refy from "../../assets/Refy.png";
import RefyNew from "../../assets/Refy_new.svg";
import SideGradient from "../../assets/side_gradient.svg";
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
import GoogleMapView from "./components/GoogleMap/GoogleMapView";
import AboutSection from "./components/AboutSection/AboutSection";


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

function InvestorProjects() {
  const { uuid } = useParams();
  let location = useLocation();
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

  const logout = async () => {

    const company = await dispatch(authActions.postLogout(uuid));
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)
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

  const refresh = async () => {
    if (location?.pathname?.includes('/investor/project/')) {
      navigate(`/investor/project/${uuid}/projectInfo`);
    }
    else {
      navigate(`/${uuid}/projectInfo`);
    }
    await dispatch(projectActions.clearChatHistory());


    // navigate(`/investor/project/${uuid}/projectInfo`);
  }




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
      <Box className="chartdiv" sx={{
        maxwidth: "1400px", width: "100%", margin: "auto",
        display: "flex", justifyContent: "center", alignItems: "center",
        backgroundColor: "#004646", height: 'calc( 100vh )',
        backgroundImage: ` radial-gradient(circle at 2% 55%, rgb(57 119 119 / 82%) 5%, rgba(174, 248, 248, 0.08) 28%), linear-gradient(to bottom, #004646, #004646)`
        // background: "radial-gradient(30.63% 47.02% at -3.67% 41.11%, rgba(174, 248, 248, 0.2) 17%, rgba(174, 248, 248, 0.04) 100%)"
      }}>


        <Box sx={{ width: "100%", height: 'calc( 100vh )', display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "center" }}>
          <Box sx={{
            width: { xs: "100%", md: "calc( 18% - 32px)" },
            padding: "16px 8px 16px 24px",
            overflowY: { xs: "none", md: "auto" },
            height: { xs: "auto", md: "calc( 100vh - 32px)" },
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 0px 0px 0px",
                flex: 1

              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0px 0px",
                  flex: 1
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", padding: "4px ", backgroundColor: "#ffffff", alignItems: "center", borderRadius: "8px", cursor: "pointer", }} onClick={() => refresh()}>
                  <img src={RefyNew} height="42px" />
                </Box>
                <Button
                  variant="text"
                  onClick={() => logout()}
                  startIcon={<img src={logoutImg} />}
                  sx={{ textTransform: "none", color: "#ffffff", fontWeight: "500", fontSize: "16px", height: "48px" }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
            <CompanyProfile project={projectdata} />
            <Box sx={{ width: "calc(100% - 4px)", padding: "0px 8px 0px 0px", display: "flex", flexDirection: "column", marginTop: "8px", gap: 1, borderRadius: "8px", }}>
              <Divider sx={{ backgroundColor: "#ffffff", opacity: "0.2", marginBottom: "8px" }} />
              <Typography sx={{ color: "#FFFFFF", fontFamily: "Manrope-Medium", fontWeight: "700", fontSize: "14px", opacity: "0.5" }}>
                Company Name
              </Typography>
              <Typography sx={{ color: "#FFFFFF", textAlign: "justified", fontSize: "14px", fontFamily: "Manrope-Medium" }}>
                {projectGenAIBasicData?.companyName}
              </Typography>
              <Divider sx={{ backgroundColor: "#ffffff", opacity: "0.2", marginBottom: "8px" }} />
              <Typography sx={{ color: "#FFFFFF", fontFamily: "Manrope-Medium", fontWeight: "700", fontSize: "14px", opacity: "0.5" }}>
                Industry
              </Typography>
              <Typography sx={{ color: "#FFFFFF", textAlign: "justified", fontSize: "14px", fontFamily: "Manrope-Medium" }}>
                Renewable Energy
              </Typography>
              <Divider sx={{ backgroundColor: "#ffffff", opacity: "0.2", marginBottom: "8px" }} />
              <AboutSection summary={projectGenAIBasicData?.summary} />

              <Typography sx={{ color: "#FFFFFF", fontWeight: "700", fontFamily: "Manrope-Medium", fontSize: "14px", opacity: "0.5" }}>
                Location
              </Typography>
              {(projectGenAIBasicData?.latitude == 0 && projectGenAIBasicData?.longitude == 0) ? <h4>N.A</h4> : <GoogleMapView latitude={projectGenAIBasicData?.latitude} longitude={projectGenAIBasicData?.longitude} />
              }
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "82%" }, height: 'calc( 100vh - 32px)', padding: "16px 16px 8px 8px" }}>
            <ChatAi />
          </Box>
        </Box>

      </Box>

    </>
  );
}
export default InvestorProjects;


{/* <Box sx={{ flex: "0 0 25%", padding: "16px" }}></Box> */ }


// !error && !project?.loading && project?.companyProfile &&