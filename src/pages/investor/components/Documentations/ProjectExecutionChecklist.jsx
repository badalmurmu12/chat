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


const preDevelopment = [
  {
    "title": "SEC Registration",
    "items": [
      { "title": "SPV (Green PV Energy Corporation)", "dateRange": "Oct 24", "status": "Completed" },
      { "title": "Technical, Social, Financial Studies", "dateRange": "Oct 24", "status": "Completed" },
      { "title": "Preliminary Connectivity Assessment", "dateRange": "Oct 24 - Nov 24", "status": "In Progress" },
      { "title": "Land Lease Contract/ Possessory", "dateRange": "Oct 24 - Nov 24", "status": "In Progress" }
    ]
  },
  {
    "title": "Technical Studies, Connectivity DD, Land DD",
    "items": [

      { "title": "Land Survey Completion", "dateRange": "Oct 24", "status": "Completed" },
      { "title": "Site Dev and Engineering Design", "dateRange": "Oct 24", "status": "Completed" },
      { "title": "A&D Certificate", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
      { "title": "Certificate of No Encumbrance", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
      { "title": "Court Clearance", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
      { "title": "Barangay Clearance, No Objection, Resolution", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
    ]
  },
  {
    "title": "Endorsement",
    "items": [

      { "title": "Municipal Endorsement", "dateRange": "Oct 24 - Jan 25", "status": "In Progress" },
      { "title": "Panlalawigan Ratification", "dateRange": "Dec 24 - Jan 25", "status": "Not Started" },
      { "title": "COA Completion", "dateRange": "Feb 25 - Mar 25", "status": "Not Started" },
      { "title": "SEOC obtained/completion", "dateRange": "Aug 25 - Sept 25", "status": "Not Started" }
    ]
  },
  {
    "title": "Permits & Licenses",
    "items": [
      { "title": "BOI, BOC Registration", "dateRange": "Mar 25 - Apr 25", "status": "In Progress" },
      { "title": "BIS, SLD (SIS Exempted)", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
      { "title": "Locational Clearance", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
      { "title": "Permit to Operate (Business Permit)", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
    ]
  },
  {
    "title": "LGU Permits",
    "items": [

      { "title": "Fire Engineering (Mechanical, Electrical, Plumbing Permit)", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
      { "title": "Fencing, Excavation & Building Permit", "dateRange": "Oct 24 - Dec 24", "status": "In Progress" },
      { "title": "Certificate of No Irrigation", "dateRange": "N.A", "status": "Not Started" },
      { "title": "NCIP - Non Overlap", "dateRange": "Mar 25 - May 25", "status": "Not Started" },
      { "title": "NIPAS", "dateRange": "Mar 25 - May 25", "status": "Not Started" },
      { "title": "DSHUD", "dateRange": "Mar 25 - May 25", "status": "In Progress" },
      { "title": "Environmental Clearance Completion", "dateRange": "Oct 24 - Feb 25", "status": "Not Started" },
      { "title": "Land Use Conversion Completion", "dateRange": "Mar 25 - July 25", "status": "Not Started" }
    ]
  }
]


const development = [
  {
    "title": "Financial Close Phase 1 - RTB Preparation",
    "items": [
      { "title": "Financial Close Phase 1", "dateRange": "", "status": "Not Started" }
    ]
  },
  {
    "title": "PPA, Connectivity, Banking",
    "items": [
      { "title": "PPA Completion", "dateRange": "Sept 25 - Oct 25", "status": "Not Started" },
      { "title": "GEAP Application", "dateRange": "Sept 25 - Oct 25", "status": "Not Started" },
      { "title": "IEMOP-WESM Registration", "dateRange": "Sept 25 - Oct 25", "status": "Not Started" },
      { "title": "Authority to Connect, CA, Provisional Authority to Connect, Final Approval to Connect", "dateRange": "Nov 25", "status": "Not Started" },
      { "title": "Financing Completion (Local Bank)", "dateRange": " Nov 25", "status": "Not Started" }
    ]
  }
]




const rtb = [
  {
    "title": "Financial Close Phase 2 - Construction",
    "items": [
      { "title": "Financial Close Phase 2", "dateRange": "", "status": "Not Started" }
    ]
  },
  {
    "title": "EPC",
    "items": [
      { "title": "Tree Cutting Permit", "dateRange": "May 25", "status": "Not Started" },
      { "title": "Right of Way- Barangay and LGU Endorsement", "dateRange": "May 25", "status": "Not Started" },
      { "title": "Land Clearing", "dateRange": "June 25", "status": "Not Started" },
      { "title": "Hydro, Geotech, Soil Testing, Pull Out test", "dateRange": "June 25", "status": "Not Started" },
      { "title": "Supplies, Equipment Delivery", "dateRange": " Nov 25", "status": "Not Started" },
      { "title": "Construction", "dateRange": "Dec 25 - Mar 26", "status": "Not Started" },
      { "title": "Testing & Commissioning", "dateRange": "Mar 26", "status": "Not Started" },
      { "title": "COC/OC", "dateRange": "Mar 26", "status": "Not Started" }
    ]
  }
]



const DocumentItem = ({ document }) => (
  <Box display="flex" flexDirection={"column"} alignItems="center" gap={2} p={0} bgcolor="background.paper"   >
    <Box flexGrow={1} sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ color: "#484848", fontFamily: "Manrope-SemiBold", fontSize: "16px", fontWeight: "400" }}>
          {document?.title}
        </Typography>
      </Box>
      <DIsplayDoc doc={document} />
    </Box>

    <Divider sx={{ backgroundColor: "#ffffff", width: "90%", opacity: "0.6", margin: "16px 8px 0px 8px" }} />


  </Box>
);

const DocumentItemIcon = ({ document }) => (
  <Box display="flex" flexDirection={"column"} alignItems="center" gap={2} p={0} bgcolor="background.paper"   >
    <Box flexGrow={1} sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ color: "#484848", fontFamily: "Manrope-SemiBold", fontSize: "16px", fontWeight: "400" }}>
          {document?.title}
        </Typography>
      </Box>
      <DIsplayDoc doc={document} />
    </Box>

    <Divider sx={{ backgroundColor: "#ffffff", width: "90%", opacity: "0.6", margin: "16px 8px 0px 8px" }} />


  </Box>
);

const DocumentSection = ({ title, documents }) => (
  <Box mb={4} pt={3}>
    <Typography variant="h4" sx={{ color: "#12190F", fontWeight: "700", fontSize: "22px", letterSpacing: "0.9px" }} fontWeight="bold" mb={2}>
      {title}
    </Typography>
    <Box display="flex" flexDirection="column" gap={2}>
      {documents?.map((doc) => (
        <CustomDocumentVIew key={doc.uuid} document={doc} type={doc?.type}
          title={doc?.title}
          link={doc?.link} />
      ))}
    </Box>
  </Box>
);

function ProjectExecutionChecklist(props) {
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

    const authdata = await dispatch(projectActions.closeTimelineBackdrop());
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
            backgroundColor: "rgba(0,54,54, 0.44)",

          }}
          open={project?.openTimelineBackdrop}

        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ width: "59%", height: "100vh", opacity: "0" }} onClick={handleClose}>

            </Box>
            <Box
              sx={{
                backgroundColor: "#fff",
                height: "calc(100vh)",
                width: "40%",
                padding: "24px 16px 24px 24px",
                overflowY: "auto",
                borderRadius: "8px"
              }}
            >
              <DocumentationsHeader title={"Project Execution Checklist"} />
              {uuid === 'demo' &&
                <Box sx={{ marginTop: "72px", width: "100%" }}>
                  <CollapsibleTimeline title="Pre development" data={preDevelopment} />
                  <CollapsibleTimeline title="Development" data={development} />
                  <CollapsibleTimeline title="RTB" data={rtb} />
                </Box>
              }
            </Box>
          </Box>
        </Backdrop >
      </Box >
    </>
  );
}

export default ProjectExecutionChecklist;
