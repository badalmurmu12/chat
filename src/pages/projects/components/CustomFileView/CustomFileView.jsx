import React, { useState } from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
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
import "./CustomFileView.css";



export default function CustomFileView(props) {
    const { type, title, link,thumbnail,length, ...other } = props;
    const dispatch = useDispatch();


    const displayFile = async () => {
        const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Fce37b490-9239-4c15-9c62-1a78ddf1c822%2FAlp%20Tech_Intro%20(1).pdf?alt=media&token=df37f7f9-83ec-4548-812b-9ed5e69dc71c';
        const authdata = await dispatch(projectActions.openBackdrop(
            link, type, title
        ));
    }

    return (
        <Box onClick={displayFile} sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
            <Box className="thumbnailImage" sx={{height: length !=1 ? "100%" : "320px" , width:"100%" }}>
                <img src={thumbnail} />
                <Box className="thumbnailHover">
                    <img src={expand} height={'24px'} className="thumbnailHoverImg" />
                </Box>
            </Box>
            <Box sx={{ width: "100%", display: "flex", cursor: "pointer", flexDirection: "row", padding: "16px 8px", borderRadius: "8px", justifyContent: "flex-start", alignItems: "center", gap: "8px" }}>
                <Box >
                    {type === 'pdf' &&
                        <img src={pdf} height={'24px'} width={'24px'} alt="" />}

                    {type === 'ppt' &&
                        <img src={ppt} height={'24px'} width={'24px'} alt="" />}

                    {type === 'word' &&
                        <img src={word} height={'24px'} width={'24px'} alt="" />}


                    {type === 'image' &&
                        <img src={image} height={'24px'} width={'24px'} alt="" />}


                    {type === 'xlx' &&
                        <img src={xlx} height={'24px'} width={'24px'} alt="" />}
                </Box>
                <Box>
                    <Typography sx={{ color: "#484848", fontSize: "14px", fontWeight: "400" }}>
                        {title?.slice(0, 30)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}