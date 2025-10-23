import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CustomFileView from "../components/CustomFileView/CustomFileView";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../../assets/Refy.png";

import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Typography, Box, Button } from "@mui/material";
import moment from 'moment';
const docs = [
  {
    link: "https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20Corporate%20Presentation%20-%202021.pdf?alt=media&token=3b5a038e-a2d9-400d-b8f8-b075321b55f0",
    title: "Detailed business plan outlining our operations, market, and growth strategy",
    type: "pdf",
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
  }
]

const PdfViewer = (props) => {
  const project = useSelector((state) => state?.project);
  const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Fce37b490-9239-4c15-9c62-1a78ddf1c822%2FAlp%20Tech_Intro%20(1).pdf?alt=media&token=df37f7f9-83ec-4548-812b-9ed5e69dc71c';
  const liquinox = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FLiquinex%20-%20Company%20%26%20Business%20Plan%20Oct2023.pdf?alt=media&token=029d8a99-c1d7-4a01-a48a-10e718521b74';
  
  return (

    <Card sx={{ marginTop: "8px", width: "100%", padding: "16px", borderRadius: "8px", boxShadow: project?.highlightdoc && props?.contentType === 'termsheet' ? "0px 0px 15px 0px #008080": "0px 0px 4px 0px #E5E5E5!important" }}>
      <CardHeader
        avatar={
          <Avatar src={props?.user?.photoURL === 'logo' ? logo : props?.user?.photoURL} sx={{ bgcolor: "#F3F4F9", height: "64px", width: "64px", borderRadius:"8px" }} aria-label="recipe" variant="square">
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Box>
          <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}>
            {props?.user?.displayName}
          </Typography>
        </Box>}
        subheader={moment(props?.timestamp).format('LLL')}
      />
      <Box sx={{ padding: "16px 16px 8px 16px" }}>
        <Typography sx={{ color: "#12190F", fontWeight: "500", fontSize: "16px",  whiteSpace: 'pre-line', }}>
          {props?.text}
        </Typography>
      </Box>
      {props?.docs?.length > 0 &&
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: 'wrap' }}>
            {props?.docs?.map((doc, index) => {
              let width = "31%";
              if (props?.docs?.length === 1) {
                width = "99%";
              } else if (props?.docs?.length === 2) {
                width = "48%";
              }
              return (
                <Box key={index} sx={{ width: {xs : "100%", md: width} }}>
                  <CustomFileView type={doc?.type} title={doc?.title} link={doc?.link} width={width} thumbnail={doc?.thumbnail} length={props?.docs?.length}/>
                </Box>
              )
            })}

          </Box>
        </CardContent>
      }


    </Card>

  );
};

export default PdfViewer;