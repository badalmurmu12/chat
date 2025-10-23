import React from 'react';
import { Typography, Box, Button, Avatar } from "@mui/material";
import documents from '../../../../assets/documents.svg';
import mail from '../../../../assets/maile.svg';
import message from '../../../../assets/message.svg';
import * as projectActions from "../../../../store/project";
import { useDispatch, useSelector } from 'react-redux';
const ActionButtons = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const project = useSelector((state) => state?.project);
  const openRequestDocuments = async () => {
    const authdata = await dispatch(projectActions.openRequestDocumentsBackdrop());
  }
  const openInviteOthers = async () => {
    const authdata = await dispatch(projectActions.openInviteOthersBackdrop());
  }
  const openAnnouncement = async () => {
    const authdata = await dispatch(projectActions.openAnnouncementBackdrop());
  }
  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column", backgroundColor: "#fff", padding: "16px 16px 32px 16px", borderRadius: "8px", boxShadow: "0px 0px 4px 0px #E5E5E5" }}>
      <Box p={2}>
        <Typography sx={{ color: "#12190F", fontSize: "20px", fontWeight: "700", letterSpacing: "0.9px" }}>
          Actions
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: 'space-around' }}>
        <Box sx={{ padding: "2px", width: !user?.user?.email?.includes('refycap.com') ? "50%" : "30%", }}>
          <Button

            fullWidth
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              width: "100%",
              fontSize: "16px",
            }}
            onClick={openAnnouncement}
            startIcon={<img src={message} />}
          >
            Announcements
          </Button>
        </Box>
        <Box sx={{ padding: "2px", width: !user?.user?.email?.includes('refycap.com') ? "50%" : "30%" , boxShadow: project?.highlightMoreQ ? "0px 0px 15px 0px #008080" : "none", backgroundColor: project?.highlightMoreQ ? '#ffffff' : '#ffffff', opacity: project?.highlightMoreQ ? 1 : 1 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              width: "100%",

              fontSize: "16px",
            }}
            onClick={openRequestDocuments}
            startIcon={<img src={documents} />}
          >
            Request document
          </Button>
        </Box>

        {user?.user?.email?.includes('refycap.com') &&
          <Box sx={{ padding: "2px", width: "30%" }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                width: "100%",
                fontSize: "16px",
              }}
              onClick={openInviteOthers}
              startIcon={<img src={mail} />}
            >
              Invite others
            </Button>
          </Box>
        }
      </Box>
    </Box>
  );
};

export default ActionButtons;



// <Box>
// <Typography>
//   Alp Technologies Ltd, established in 2017 in London, England,
//   develops affordable smart renewable energy solutions for
//   emerging markets. Specializes in the Mega-BRIC Battery System, a
//   maintainable and cost-effective clean energy solution. View More
// </Typography>
// </Box>