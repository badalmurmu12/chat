import React from 'react';
import { Typography, Box, Button, Avatar } from "@mui/material";
import documents from '../../../../assets/documents.svg';
import mail from '../../../../assets/maile.svg';
import calendar from '../../../../assets/calendar.svg';
import grabiella from '../../../../assets/grabieela.png';
import Chevronright from '../../../../assets/chevron-right.svg';
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import * as projectActions from "../../../../store/project";
const ActionButtons = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state?.project);
  const openContactUs = async() =>{
    const authdata = await dispatch(projectActions.openContactUsBackdrop());
  }
  return (<><CssBaseline />
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column", backgroundColor: "#fff", padding: "16px 16px 32px 16px", borderRadius: "8px", boxShadow: project?.highlightMoreQ ? "0px 0px 15px 0px #008080": "0px 0px 4px 0px #E5E5E5", backgroundColor: project?.highlightMoreQ ? '#ffffff' : '#ffffff', opacity: project?.highlightMoreQ ? 1 : 1  }}>
      <Box >
        <Typography sx={{ color: "#12190F", fontSize: "18px", fontWeight: "700", letterSpacing: "0.9px" }}>
          Contact Us
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Avatar src={grabiella} />
            <Box
              sx={{
                display: "flex",
                pl: 2,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "16px", letterSpacing: "0.9px" }}>Teri Koey</Typography>
              <Typography sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "14px" }}>Refy’s Business Developer</Typography>
            </Box>
          </Box>

        </Box>
      </Box>
      <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap:0.7
          }}
        >
          <Typography sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}>Email</Typography>
          <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "14px", letterSpacing: "0.9px" }}>teri@refycap.com</Typography>

        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap:0.7
          }}
        >
          <Typography sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}>Phone Number</Typography>
          <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "14px", letterSpacing: "0.9px" }}>+65 9222 7763</Typography>

        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, paddingTop:"16px", justifyContent: 'space-around' }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none",
            width: "100%",
            fontSize: "16px",
          }}
          onClick={openContactUs}
          startIcon={<img src={calendar} />}
        >
          Schedule a call
        </Button>



      </Box>
    </Box>
  </>
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