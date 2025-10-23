import React, { useState } from "react";
import firebase from "../../firebase";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Header from "../additionalDetails/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box } from "@mui/material";
import underDevelopment from "../../assets/underDevelopment.svg";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          height: "80vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:1}}>
          <img src={underDevelopment} height="300px"/>
          <Typography variant="h2" sx={{ color: "#12190F", fontWeight:"700", fontSize:"24px" }}>
            Product Under Development
          </Typography>
          <Typography variant="h6" sx={{ color: "#ABABAB", fontWeight:"400", fontSize:"16px" }}>
            We are developing this product quickly we ill let you know once its
            ready
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default HomePage;
