import React, { useState } from "react";
import { Typography, Box, Button, Avatar, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as projectActions from "../../../../store/project";
import pdf from "../../../../assets/pdf.svg";
import image from "../../../../assets/image.svg";
import ppt from "../../../../assets/ppt.svg";
import word from "../../../../assets/word.svg";
import xlx from "../../../../assets/xlx.svg";
import hexaore from "../../../../assets/hexaore.png";
import welcome from "../../../../assets/welcome.png";
import expand from "../../../../assets/arrows-expand.svg";
import graphThumb from "../../../../assets/graph_demo.svg";
import ErrorBoundary from "../ChartUi/ErrorBoundary";
import ChartUi from "../ChartUi/ChartUi";
import "./CustomFileView.css";



export default function CustomFileView(props) {
    const { type, title, link, thumbnail, length, onClick, file, ...other } = props;
   
    const dispatch = useDispatch();
    const displayFile = async () => {
        const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Fce37b490-9239-4c15-9c62-1a78ddf1c822%2FAlp%20Tech_Intro%20(1).pdf?alt=media&token=df37f7f9-83ec-4548-812b-9ed5e69dc71c';
        const authdata = await dispatch(projectActions.openBackdrop(
            link, type, title
        ));
    }
    const handleClick = async () => {

        if (onClick) {
            onClick();
        }
    }

    return (<>
        <Box onClick={handleClick} sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", margin: "0px 8px", borderRadius: "8px" }}>
            <Box sx={{ width: "100%", display: "flex", cursor: "pointer", flexDirection: "row", padding: "32px 8px 8px 8px", borderRadius: "8px", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                <Box>
                    <Typography sx={{ color: "#484848", fontFamily: "Manrope-SemiBold", fontSize: "16px", fontWeight: "400" }}>
                        {Object?.keys(file)[0]}
                    </Typography>
                </Box>
            </Box>
            <Box className="thumbnailImage" sx={{ height: length != 1 ? "100%" : "320px", width: "100%" }}>
                <ErrorBoundary >
                    <ChartUi message={Object?.values(file)[0]} />
                </ErrorBoundary>
            </Box>

        </Box>
         <Divider sx={{ backgroundColor: "#ffffff", opacity: "0.6", margin: "16px 8px 0px 8px" }} />
         </> 
    );
}