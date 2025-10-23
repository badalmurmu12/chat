import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../additionalDetails/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Button, Avatar } from "@mui/material";
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
import pdf from "../../assets/pdf.svg";
import CustomDocumentVIew from "./components/CustomDocumentView/CustomDocumentView";
import RequestDocumentsPopup from "./components/RequestDocumentsPopup/RequestDocumentsPopup";
import DisplayFile from "./components/DisplayFile/DIsplayFile";
import {
  set,
  ref,
  getDatabase,
  onValue,
  remove,
  update,
} from "firebase/database";

const docs = [
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20Corporate%20Presentation%20-%202021.pdf?alt=media&token=3b5a038e-a2d9-400d-b8f8-b075321b55f0",
    title: "Detailed business plan outlining our operations, market, and growth strategy",
    type: "pdf"
  },
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FNon%20HF%20Recycle%20%20Project%20update%2007%20Apr%20%2024.pptx?alt=media&token=ac72d5a9-1828-4db7-a45b-623334261139",
    title: "Financial projections for the next 3-5 years",
    type: "ppt"
  },
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FREC%20Project%20FInancials_09052024%20(1).xlsx?alt=media&token=56b042b1-4ea1-4374-a7e0-b8f0e065b1d2",
    title: "Financial projections for the next 3-5 years",
    type: "xlx"
  },
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20-%20Company%20%26%20Business%20Plan%20Oct2023.pdf?alt=media&token=029d8a99-c1d7-4a01-a48a-10e718521b74",
    title: "Detailed business plan outlining our operations, market, and growth strategy",
    type: "pdf"
  }


]


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DocumentList = ({ data }) => {
  return (
    <div>
      {Object.entries(data).map(([category, documents]) => (
        <div key={category}>
          <h2>{category || 'Uncategorized'}</h2>
          {documents.map((doc, index) => (
            <div key={index} className="document">
              <h3>{doc.title}</h3>
              <img src={doc.thumbnail} alt={doc.title} />
              <p>Type: {doc.type}</p>
              <p>{doc.text}</p>
              <p>Uploaded by: {doc.displayName} on {doc.timestamp}</p>
              <a href={doc.link} target="_blank" rel="noopener noreferrer">View Document</a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

function Documentation() {
  const { uuid } = useParams();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state?.auth);
  const project = useSelector((state) => state?.project);

  const logout = async (e) => {
    e.preventDefault();
    const company = await dispatch(authActions.logoutSuccess());
    navigate("/login");
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const openRequestDocuments = async () => {
    const authdata = await dispatch(projectActions.openRequestDocumentsBackdrop());
  }

  const downloadAllDocuments = async () => {
    setDownloading(true);
    try {
      // Get all documents across categories
      const allDocuments = Object.values(project?.documents || {}).flat();

      // Download each document
      for (const doc of allDocuments) {
        if (doc.link) {
          const response = await fetch(doc.link);
          const blob = await response.blob();

          // Create a temporary link element
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);

          // Extract filename from the link or use the title
          const filename = doc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() +
            getFileExtension(doc.type);

          link.download = filename;

          // Trigger download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Add a small delay between downloads to prevent overwhelming the browser
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error('Error downloading files:', error);
    } finally {
      setDownloading(false);
    }
  };

  const getFileExtension = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return '.pdf';
      case 'ppt':
      case 'pptx':
        return '.pptx';
      case 'xlx':
      case 'xlsx':
        return '.xlsx';
      default:
        return '';
    }
  };

  useEffect(() => {
    async function fetchProjectData() {
      if (!uuid) return;
      if (user && user.token) {
        let uuidData = {
          "uuid": uuid
        }
        const projectdata = await dispatch(projectActions.informationsDeveloper(uuid));
      }
    }

    fetchProjectData();
  }, [uuid, user.token]);

  useEffect(() => {
    async function fetchDocumentsData() {
      if (!uuid) return;
      if (user && user.token) {
        const docu = await dispatch(projectActions.allDocuments(uuid));
      }
    }
    fetchDocumentsData();
  }, [uuid, user.token]);


  useEffect(() => {
    async function fetchProjectAirData() {
      if (!uuid) return;
      if (user && user.token) {
        let uuidData = {
          "uuid": uuid
        }
        const projectdata = await dispatch(projectActions.informationsDeveloper(uuid));
      }
    }
    fetchProjectAirData();
  }, [uuid, user.token]);

  return (
    <>
      <RequestDocumentsPopup />
      <DisplayFile />
      <Header />
      <Box sx={{ width: "100%", height: "calc(100vh - 120px)", maxWidth: "1400px", margin: "auto" }}>
        {!project?.unauthorised &&
          <Box sx={{
            width: "100%", margin: "auto",
            display: "flex", justifyContent: "center", flexDirection: "column", padding: "0px 8px"
          }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", }}>
              <Box sx={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: "8px", padding: "16px 0px" }}>
                <Box sx={{ display: " flex", flexDirection: "column" }}>
                  <Typography sx={{ color: "#000000", fontSize: "24px", fontWeight: "700" }}>Documents</Typography>
                  <Typography sx={{ color: "#9C9C9C", fontSize: "16px", fontWeight: "400" }}>Find all your investment related documents here.</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 , alignItems:"center"}}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "capitalize",
                      width: "100%",
                      fontSize: "14px",
                      height:"42px",
                      width:"120px"
                    }}
                    onClick={downloadAllDocuments}
                    disabled={downloading}
                  >
                    {downloading ? 'Downloading...' : 'Download All'}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      textTransform: "capitalize",
                      width: "100%",
                      fontSize: "14px",
                      height:"42px",
                      width:"170px"

                    }}
                    onClick={openRequestDocuments}
                  >
                    Request Documents
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>

                {project?.documents && Object?.entries(project?.documents)?.map(([category, documents]) => (
                  <>
                    <Box key={category} sx={{ display: "flex", flexDirection: "column", paddingTop: "24px", paddingBottom: "8px" }}>
                      <Typography sx={{ color: "#000000", fontSize: "20px", fontWeight: "500" }}>{category || 'Others'}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1, flexFlow: "wrap" }}>
                      {documents?.map((file, fileIndex) => (
                        <CustomDocumentVIew
                          key={fileIndex}
                          type={file?.type}
                          title={file?.title}
                          link={file?.link}
                        />
                      ))}
                    </Box>
                  </>
                )).reverse()}
              </Box>
            </Box>
          </Box>
        }
        {project?.unauthorised &&
          <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>You are not authorized to view this page.</Box>
        }
      </Box>
    </>
  );
}
export default Documentation;


{/* <Box sx={{ flex: "0 0 25%", padding: "16px" }}></Box> */ }