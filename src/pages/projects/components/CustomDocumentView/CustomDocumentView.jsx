import React, { useState } from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as projectActions from "../../../../store/project";
import pdf from "../../../../assets/pdf.svg";
import image from "../../../../assets/image.svg";
import ppt from "../../../../assets/ppt.svg";
import word from "../../../../assets/word.svg";
import xlx from "../../../../assets/xlx.svg";



export default function CustomDocumentView(props) {
    const { type, title, link, ...other } = props;
    const dispatch = useDispatch();


    const displayFile = async () => {
        const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Fce37b490-9239-4c15-9c62-1a78ddf1c822%2FAlp%20Tech_Intro%20(1).pdf?alt=media&token=df37f7f9-83ec-4548-812b-9ed5e69dc71c';
        const authdata = await dispatch(projectActions.openBackdrop(
            link, type, title
        ));
    }
    function transformFilename(filename) {
        // Remove file extension if present
        let name = filename.replace(/\.[^/.]+$/, "");

        // Remove underscores
        name = name.replace(/_/g, " ");
        if (name.length > 80) {
            name = name.substring(0, 77) + "...";
        }
        return name;
    }

    return (
        <Box sx={{ width: { xs: "90%", sm: "calc(25% - 16px)" }, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>

            <Box onClick={displayFile} sx={{ width: "100%", display: "flex", cursor: "pointer", flexDirection: "row", margin: "8px 8px 8px 0px", padding: "16px", boxShadow: "0px 0px 4px 0px #E5E5E5", borderRadius: "8px", justifyContent: "flex-start", alignItems: "center", gap: "8px", backgroundColor: "#fff", }}>
                <Box >
                    {type?.includes('pdf') &&
                        <img src={pdf} height={'58px'} width={'58px'} alt="" />}

                    {type?.includes('ppt') &&
                        <img src={ppt} height={'58px'} width={'58px'} alt="" />}

                    {(type?.includes('txt') || type?.includes('docx') || type?.includes('doc')) &&
                        <img src={word} height={'58px'} width={'58px'} alt="" />}


                    {(type?.includes('image') || type?.includes('png') || type?.includes('jpg') || type?.includes('svg')) &&
                        <img src={image} height={'58px'} width={'58px'} alt="" />}


                    {type?.includes('xlx') &&
                        <img src={xlx} height={'58px'} width={'58px'} alt="" />}
                    {type?.includes('xlsx') &&
                        <img src={xlx} height={'58px'} width={'58px'} alt="" />}
                </Box>
                <Box>
                    <Typography sx={{ color: "#484848", fontSize: "14px", fontWeight: "400" }}>
                        {transformFilename(title)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}