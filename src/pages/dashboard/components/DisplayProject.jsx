import { ReactElement, useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import createproject from "../../../assets/createproject.svg";
import AddIcon from "@mui/icons-material/Add";
import CssBaseline from "@mui/material/CssBaseline";
import * as projectActions from "../../../store/project";
import pending from "../../../assets/pending.svg";
import todo from "../../../assets/todo.svg";
import next from "../../../assets/next.svg";
import projectdone from "../../../assets/project_done.svg";
import appointment from "../../../assets/appointment.png";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as authActions from "../../../store/auth";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function DisplayProject(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMessage, setProject] = useState(false);

  const createProject = async () => {
    const authdata = await dispatch(projectActions.openBackdrop());
  };
  const contactUs = async() => {
    const tnc = await dispatch(
      authActions.getStarted("Due Diligence Support Dashboard")
    );
    navigate("/lets-chat");
  };
  const viewProject = () => {
    setProject(true);
  };
  const handleClose = () => {
    setProject(false);
  };
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showMessage}
      >
        <DialogTitle
          sx={{ m: 2, p: 2 }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box p={3}>  <Typography variant="h6" align="center">Your submission is under review.</Typography>
                       <Typography variant="h6" align="center">Our team will reach out to you shortly.</Typography></Box>
        </DialogContent>
      </BootstrapDialog>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "calc(50% - 32px)",
            alignItems: "flex-start",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid #E5E5E5",
            margin: "16px 0px",
            gap: 4,
          }}
        >
          <CssBaseline />
          <Box pt={3}>
            <img src={projectdone} />
          </Box>
          <Box
            sx={{
              width: "421px",
              height: "83px",
              padding: "8px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px 8px ",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#12190F",
                      fontSize: "28px",
                      fontWeight: "700",
                    }}
                  >
                    {props?.data[0]?.BasicData?.ProjectName}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#9C9C9C",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {props?.data[0]?.ProjectSummary?.ProjectSummary?.slice(
                      0,
                      120
                    )}
                  </Typography>
                </Box>
                <Box sx={{ paddingTop: "16px" }}>
                  <Button
                    variant="outlined"
                    onClick={viewProject}
                    endIcon={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src={next} />
                      </Box>
                    }
                    sx={{
                      textTransform: "none",
                      width: "200px",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    View project
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "calc(50% - 32px)",
            alignItems: "flex-start",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid #E5E5E5",
            margin: "16px 0px",
            gap: 4,
          }}
        >
          <CssBaseline />
          <Box pt={3}>
            <img src={appointment} height="161px" />
          </Box>
          <Box
            sx={{
              width: "421px",
              height: "83px",
              padding: "8px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px 8px ",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#12190F",
                      fontSize: "28px",
                      fontWeight: "700",
                    }}
                  >
                    Schedule an Appointment
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#9C9C9C",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Click on the below button to give us your contact details We
                    will connect with you help with the next steps.
                  </Typography>
                </Box>
                <Box sx={{ paddingTop: "16px" }}>
                  <Button
                    variant="contained"
                    onClick={contactUs}
                    startIcon={<PhoneInTalkIcon />}
                    sx={{
                      textTransform: "none",
                      width: "200px",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DisplayProject;
