import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Backdrop,
  IconButton,
  CircularProgress,
  Grid,
  Divider
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DocumentationsHeader from "./DocumentationsHeader";
import DIsplayDoc from "../../../projects/components/DisplayFile/DIsplayDoc";
import CustomFileView from "../CustomFileView/CustomFileView";
import ErrorBoundary from "../ChartUi/ErrorBoundary";
import ChartUi from "../ChartUi/ChartUi";
import * as projectActions from "../../../../store/project";
import CustomDocumentVIew from "../CustomDocumentView/CustomDocumentView";
import CollapsibleTimeline from "./CollapsibleTimeline";
import { Divide } from "lucide-react";


const DocumentItem = ({ document }) => (
  <Box display="flex" flexDirection={"column"} alignItems="center" gap={2} p={0} bgcolor="background.paper"   >
    <Box flexGrow={1} sx={{width:"100%"}}>
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Typography sx={{ color: "#484848", fontFamily: "Manrope-SemiBold", fontSize: "16px", fontWeight: "400" }}>
          {document?.title}  
        </Typography>
      </Box>
      <DIsplayDoc doc={document} />
    </Box>

    <Divider sx={{ backgroundColor: "#ffffff",width:"90%", opacity: "0.6", margin: "16px 8px 0px 8px" }} />
          
 
  </Box>
);

const DocumentItemIcon = ({ document }) => (
  <Box display="flex" flexDirection={"column"} alignItems="center" gap={2} p={0} bgcolor="background.paper"   >
    <Box flexGrow={1} sx={{width:"100%"}}>
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Typography sx={{ color: "#484848", fontFamily: "Manrope-SemiBold", fontSize: "16px", fontWeight: "400" }}>
          {document?.title}  
        </Typography>
      </Box>
      <DIsplayDoc doc={document} />
    </Box>

    <Divider sx={{ backgroundColor: "#ffffff",width:"90%", opacity: "0.6", margin: "16px 8px 0px 8px" }} />
          
 
  </Box>
);

const DocumentSection = ({ title, documents }) => (
  <Box mb={4} pt={3}>
    <Typography variant="h4" sx={{ color: "#12190F", fontWeight: "700", fontSize: "22px", letterSpacing: "0.9px" }} fontWeight="bold" mb={2}>
      {title}
    </Typography>
    <Box display="flex" flexDirection="column" gap={2}>
      {documents?.map((doc) => (
        <CustomDocumentVIew key={doc.uuid} document={doc}     type={doc?.type}
        title={doc?.title}
        link={doc?.link} />
      ))}
    </Box>
  </Box>
);

function Documentations(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { uuid, typeOfQ } = useParams();
  const handleSubmit = async (companyData) => {
  };
  const project = useSelector((state) => state.project);
  const documents = useSelector((state) => state?.project?.documents);
  const projectGenAIAnalytics = useSelector((state) => state?.project?.projectGenAIAnalytics);

  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    async function fetchProjectAirData() {
      const company = await dispatch(projectActions.aiAnalytics(uuid));
    }
    fetchProjectAirData();
  }, [uuid]);

  useEffect(() => {
    async function fetchDocumentsData() {
      if (!uuid) return;
      const docu = await dispatch(projectActions.allDocuments(uuid));

    }
    fetchDocumentsData();
  }, [uuid]);


  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const saveToSummary = async () => { };
  const handleClose = async () => {

    const authdata = await dispatch(projectActions.closeBackdrop());
  };

  return (
    <>
      <Box>

        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor:"rgba(0,54,54, 0.44)",
          }}
          open={project?.openBackdrop}

        >
          <Box
            sx={{
              backgroundColor: "#fff",
              height: "calc(100vh)",
              width: "40%",
              padding: "24px 24px",
              overflowY: "auto",
              borderRadius: "8px"
            }}
          >
            <DocumentationsHeader />

            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: "wrap",
                gap: "8px",
                pt: 2,
              }}
            >

              {projectGenAIAnalytics.map((file) => (
                <CustomFileView
                  key={file.id}
                  file={file}
                  onClick={() => handleFileClick("file")}
                />
              ))}


            </Box> */}

            <Box maxWidth="lg" mx="auto" p={1} mt={4}>
              {documents && Object?.entries(documents)?.map(([category, docs]) => (
                <DocumentSection key={category} title={category} documents={docs} />
              ))}
            </Box>
              {/* <Grid item xs={6}>
                {projectGenAIAnalytics?.filter((_, index) => index % 2 !== 0).map((file) => (
                  <CustomFileView
                    key={file?.id}
                    file={file}
                    onClick={() => handleFileClick(file)}
                  />
                ))}
              </Grid> */}

            {/* {selectedFile && (
              <Box sx={{ mt: 2 }}>
                <ChartUi message={selectedFile === "file1" ? "{\"type\":\"bar\",\"data\":{\"labels\":[\"2019\",\"2020\",\"2021\",\"2022\",\"2023\"],\"datasets\":[{\"label\":\"Sales\",\"data\":[65000,59000,80000,81000,56000],\"backgroundColor\":\"rgba(75, 192, 192, 0.6)\"}]}}" : "{\"type\":\"bar\",\"data\":{\"labels\":[\"Q1\",\"Q2\",\"Q3\",\"Q4\"],\"datasets\":[{\"label\":\"Revenue\",\"data\":[20000,25000,30000,35000],\"backgroundColor\":\"rgba(153, 102, 255, 0.6)\"}]}}"} />
              </Box>
            )} */}
            <CollapsibleTimeline />
          </Box>
        </Backdrop >
      </Box >
    </>
  );
}

export default Documentations;
