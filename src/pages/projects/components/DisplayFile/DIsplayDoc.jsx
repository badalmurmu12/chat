import React, { ReactElement, useState, useEffect } from "react";
import {
    Box,
    Avatar,
    Typography,
    Button,
    Backdrop,
    IconButton,
    CircularProgress
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import createproject from "../../../../assets/createproject.svg";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import * as projectActions from "../../../../store/project";
import Close from "../../../../assets/close.svg";
import download from "../../../../assets/download.svg";
import share from "../../../../assets/share.svg";

function DIsplayDoc(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = useState(true);
    const [link, setLink] = React.useState("");
    const project = useSelector((state) => state.project);
    const handleClose = async () => {
        const authdata = await dispatch(projectActions.closeBackdrop());
    };
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        // setDetails(props?.details);
        if (props?.doc?.link) {
            const encodedUrl = encodeURIComponent(props?.doc?.link);

            // Create the Google Docs viewer URL
            const googleDocViewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
            setLink(googleDocViewerUrl)
            setLoading(true);
        }
    }, [props?.doc?.link]);

    const downloadFile = () => {
        const url = props?.doc?.link;
        if (url) {
            const a = document.createElement('a');
            a.href = url;
            a.download = url.substring(url.lastIndexOf('/') + 1);
            a.target = "_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }



    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    width: { xs: "95%", sm: "100%" },
                    padding: { xs: "8px 8px", sm: "8px 8px" },
                    overflowY: "auto",
                    height: "auto",
                    overflowY: "auto",
                    borderRadius: "8px",
                    minHeight:"200px"
                }}
            >
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    </Box>
                    <Box pt={1} pl={0} sx={{ display: "flex", gap: 2 }}>
                        <Box onClick={downloadFile} sx={{ cursor: "pointer" }}>
                            <img src={download} height={'18px'} />
                        </Box>
                        <Box>
                            <img src={share} height={'18px'} />
                        </Box>

                    </Box>
                </Box>
                {props?.doc?.type != ".xlsx" &&
                    <Box sx={{ padding: "0px", minHeight:"200px" }}>
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 264px)', backgroundColor: "#F3F4F9", borderRadius: "8px" }}>
                                <CircularProgress />
                            </Box>
                        )}
                        {<iframe
                            src={props?.doc?.link}
                            width="100%"
                            height="240px"  
                            style={{ display: loading ? 'none' : 'block' }}
                            onLoad={() => setLoading(false)}
                        />


                        }
                    </Box>
                }
            </Box>
        </>
    );
}

export default DIsplayDoc;
