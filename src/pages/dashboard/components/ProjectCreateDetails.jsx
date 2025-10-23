import React, { ReactElement, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Backdrop,
  IconButton,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import createproject from "../../../assets/createproject.svg";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import * as projectActions from "../../../store/project";
import UploadDocuments from "./UploadDocuments";
import ProjectBasicDetails from "./ProjectBasicDetails";
import ProjectSummary from "./ProjectSummary";
import ProjectCreateHeader from "./ProjectCreateHeader";
import ProjectAdditionalQuestions from "./ProjectAdditionalQuestions";
import ProjectConnectWithUs from "./ProjectConnectWithUs";
import ProjectFinalStep from "./ProjectFinalStep";

function CreateProjectDetails(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const project = useSelector((state) => state.project);

  const handleOpen = () => {
    setOpen(true);
  };
  const saveToSummary = async () => {};

  const nextToSummary = async () => {
    const authdata = await dispatch(projectActions.saveSummary({}));
  };
  return (
    <>
      <Box>
        <CssBaseline />
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor:"rgba(0,70,70, 0.44)",
          }}
          open={project?.openBackdrop}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              height: "calc(100vh)",
              width: "60%",
              padding: "24px 64px",
              overflowY: "auto",
            }}
          >
            <ProjectCreateHeader />

            {project?.basicData && (
              <>
                <ProjectBasicDetails />
              </>
            )}
            {project?.summaryData && <ProjectSummary />}
            {project?.summaryFromLlm &&
              !project?.summaryFromLlm &&
              !project?.additionalQuestion && <UploadDocuments />}

            {project?.summaryFromLlm && (
              <>
                {" "}
                <ProjectSummary />
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: 2, pt: 2 }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
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
                      width: "70%",
                      fontSize: "20px",
                    }}
                    onClick={nextToSummary}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}

            {project?.additionalQuestion && (
              <>
                <ProjectAdditionalQuestions />
              </>
            )}

            {project?.contactUs && (
              <>
                <ProjectConnectWithUs />
              </>
            )}

            {project?.finalSteps && (
              <>
                <ProjectFinalStep />
              </>
            )}
          </Box>
        </Backdrop>
      </Box>
    </>
  );
}

export default CreateProjectDetails;
