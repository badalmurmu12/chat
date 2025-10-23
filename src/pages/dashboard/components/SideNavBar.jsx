import { ReactElement, useState } from "react";
import { Box, Avatar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Refy from "../../../assets/Refy.png";
import dashboard_icon from "../../../assets/dashboard_icon.svg";
import { useSelector, useDispatch } from "react-redux";

function SideNavBar() {
  const user = useSelector((state) => state?.auth);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width:"90px",
          backgroundColor:"#003636", 
          height:'100vh',
          alignItems:"center",
          position:"fixed"
        }}
      >
         <CssBaseline />
        <Box pt={3}>
            <img src={Refy} height={"60px"} />
        </Box>
        <Box sx={{display:"flex", flexDirection:"column"}}>
          <Box>
          <img src={dashboard_icon} height={"30px"} />
          </Box>
          <Box>
          <img src={dashboard_icon} height={"30px"} />
          </Box>
          <Box>
          <img src={dashboard_icon} height={"30px"} />
          </Box>
          <Box>
          <img src={dashboard_icon} height={"30px"} />
          </Box>
        </Box>
        <Box pb={3}>
            <Avatar  src={user?.user?.photoURL} />
        </Box>
      </Box>
    </>
  );
}

export default SideNavBar;
