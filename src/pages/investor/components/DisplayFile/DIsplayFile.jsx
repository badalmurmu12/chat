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

function CreateProjectDetails(props) {
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
        if (project?.link) {
            const encodedUrl = encodeURIComponent(project?.link);

            // Create the Google Docs viewer URL
            const googleDocViewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
            setLink(googleDocViewerUrl)
            setLoading(true); 
        }
    }, [project]);

    const downloadFile = () =>{
      const url = project?.link;
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
            <Box>
                <CssBaseline />
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        display: "flex",
                        justifyContent: "center",
                    }}
                    open={project?.openBackdrop}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            width: {xs:"95%" ,sm:"80%" },
                            padding: {xs:"8px 24px",sm:"24px 64px" },
                            overflowY: "auto",
                            height: "calc(100vh - 64px)",
                            overflowY: "auto",
                            borderRadius:"8px"
                        }}
                    >
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ color: "#12190F", fontWeight: "700", letterSpacing: "0.9px", fontSize:{xs:"16px" ,sm:"22px" }}}>
                                    {project?.title}
                                </Typography>
                                <Box sx={{display:"flex", }}>
                                <IconButton aria-label="delete" size="small" onClick={handleClose}>
                                        <img src={Close} height={"28px"} />       
                                </IconButton>
                                </Box>
                            </Box>
                            <Box pt={1} pl={2} sx={{display:"flex", gap:2}}>
                                <Box onClick={downloadFile} sx={{cursor:"pointer"}}>
                                    <img src={download} height={'28px'} />
                                </Box>
                                <Box>
                                    <img src={share} height={'28px'} />
                                </Box>

                            </Box>
                        </Box>

                        <Box sx={{ padding: "16px" }}>
                        {loading && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 264px)', backgroundColor:"#F3F4F9" , borderRadius:"8px"}}>
                                    <CircularProgress />
                                </Box>
                            )}
                            {project?.openBackdrop && <iframe
                                src={link}
                                width="100%"
                                height="auto"
                                style={{ minHeight: "calc(100vh - 264px)", display: loading ? 'none' : 'block' }}
                                onLoad={() => setLoading(false)}
                            />
                           
                                 
                            }
                        </Box>

                    </Box>
                </Backdrop>
            </Box>
        </>
    );
}

export default CreateProjectDetails;
