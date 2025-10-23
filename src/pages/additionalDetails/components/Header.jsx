import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import { useTheme } from "@mui/material/styles";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import logo from "../../../assets/logo.png";
import Refy from "../../../assets/Refy.png";
import logoutImg from "../../../assets/logout.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../../store/auth";

const pages = [
  {
    "name": "Project Overview",
    "url": "/project/"
  },

  {
    "name": "Documentations",
    "url": "/project/documentation/"
  }
];

export default function Header() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const user = useSelector((state) => state?.auth);
  const project = useSelector((state) => state?.project);
  const logout = async () => {
    const company = await dispatch(
      authActions.logoutSuccess()
    );
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)

  };

  const isActiveLink = (url) => {
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    // Check if the pathname starts with the cleanUrl
    return location.pathname.startsWith(cleanUrl);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 16px",
          backgroundColor: "#ffffff",

        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={Refy} height="48px" />
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" , gap:2}}>
          {user?.loggedIn && (location?.pathname != '/projectss')  &&<>
            <Link href={'/project/' + uuid} sx={{ textDecoration: "none" }}>
              <Button
                sx={{
                  my: 1, color: !location.pathname.includes('documentation') ? '#008080' : '#47474F', display: 'block', textTransform: 'capitalize', textDecoration: "none",
                  fontSize: '18px'
                }}
              >
                Project Overview

              </Button>
            </Link>
            <Link href={'/project/documentation/' + uuid} sx={{ textDecoration: "none" ,}}>
              <Button


                sx={{
                  my: 1, color: location.pathname.includes('documentation') ? '#008080' : '#47474F', display: 'block', textTransform: 'capitalize', textDecoration: "none",
                  fontSize: '18px',
                  boxShadow: project?.highlightMoreQ ? "0px 0px 15px 0px #008080": "none", backgroundColor: project?.highlightMoreQ ? '#ffffff' : '#ffffff', opacity: project?.highlightMoreQ ? 1 : 1
                }}

              >
                Documentations
              </Button>
            </Link>
          </>
          }


        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: "center" , gap:2}}>
          {user?.loggedIn && <>
            {/* <Link href={'/project/' + uuid} sx={{ textDecoration: "none" }}>
              <Button
                sx={{
                  my: 2, color: !location.pathname.includes('documentation') ? '#008080' : '#47474F', display: 'block', textTransform: 'capitalize', textDecoration: "none",
                  fontSize: '18px'
                }}
              >
                Project
              </Button>
            </Link>
            <Link href={'/project/documentation/' + uuid} sx={{ textDecoration: "none" ,}}>
              <Button


                sx={{
                  my: 2, color: location.pathname.includes('documentation') ? '#008080' : '#47474F', display: 'block', textTransform: 'capitalize', textDecoration: "none",
                  fontSize: '18px',
                  boxShadow: project?.highlightMoreQ ? "0px 0px 15px 0px #008080": "none", backgroundColor: project?.highlightMoreQ ? '#ffffff' : '#ffffff', opacity: project?.highlightMoreQ ? 1 : 1
                }}

              >
                Documentations
              </Button>
            </Link> */}
          </>
          }


        </Box>


        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
          {user?.loggedIn && (
            <>
              <Button
                variant="outlined"
                onClick={() => logout()}
                startIcon={<img src={logoutImg} />}
                sx={{my:1, textTransform: "none", fontWeight: "500", fontSize: "18px", height: "48px" }}
              >
                Logout
              </Button>
            </>
          )}

        </Box>
      </Box>
    </>
  );
}

// "#E6F2F2"
