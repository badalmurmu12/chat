import React, { ReactElement, useState, useEffect } from "react";
import {
    Box,
    Avatar,
    Typography,
    Button,
    Backdrop,
    IconButton,
    CircularProgress,
    Paper
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
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function CreateProjectDetails(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = useState(true);
    const [link, setLink] = React.useState("");
    const [isImage, setIsImage] = useState(false);
    const [fileType, setFileType] = useState("other"); // "image", "text", or "other"
    const [textContent, setTextContent] = useState("");
    const project = useSelector((state) => state.project);
    const handleClose = async () => {
        const authdata = await dispatch(projectActions.closeBackdrop());
    };
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (project?.link) {
            const fileExtension = project.link.split('.').pop().toLowerCase();
            const imageExtensions = ['jpg', 'jpeg', 'png'];

            if (imageExtensions.includes(fileExtension)) {
                setFileType("image");
                setLink(project.link);
            } else if (fileExtension.includes('txt')) {
                setFileType("text");
                const encodedUrl = encodeURIComponent(project.link);
                const googleDocViewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
                setLink(googleDocViewerUrl);
            } else {
                setFileType("other");
                const encodedUrl = encodeURIComponent(project.link);
                const googleDocViewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
                setLink(googleDocViewerUrl);
            }
            setLoading(true);
        }
    }, [project]);

    const fetchTextContent = async (url) => {
        try {
            const response = await fetch(url);
            const text = await response.text();
            setTextContent(text);
            setLoading(false);
        } catch (error) {
            console.error("Error loading text file:", error);
            setTextContent("Error loading text file content");
            setLoading(false);
        }
    };

    const downloadFile = async () => {
        if (!project?.link) return;
        
        try {
            // Get Firebase storage instance
            const storage = getStorage();
            
            // Create a reference to the file
            const fileRef = ref(storage, project.link);
            
            // Get the download URL
            const downloadURL = await getDownloadURL(fileRef);
            
            // Get the file name from the path
            const fileName = project.link.split('/').pop() || 'download';
    
            // Create XHR request
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            
            // Handle successful download
            xhr.onload = (event) => {
                if (xhr.status === 200) {
                    // Create blob from response
                    const blob = xhr.response;
                    
                    // Create object URL from blob
                    const blobUrl = URL.createObjectURL(blob);
                    
                    // Create temporary link and trigger download
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    
                    // Cleanup
                    document.body.removeChild(link);
                    URL.revokeObjectURL(blobUrl);
                }
            };
    
            // Handle download progress (optional)
            xhr.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    console.log(`Download progress: ${percentComplete}%`);
                }
            };
    
            // Handle errors during download
            xhr.onerror = () => {
                console.error('Download failed');
                alert('Failed to download file. Please try again.');
            };
    
            // Start download
            xhr.open('GET', downloadURL);
            xhr.send();
            
        } catch (error) {
            console.error('Download failed:', error);
            
            // Handle different Firebase Storage errors
            switch (error.code) {
                case 'storage/object-not-found':
                    alert('File not found. It might have been deleted.');
                    break;
                case 'storage/unauthorized':
                    alert('You do not have permission to access this file.');
                    break;
                case 'storage/canceled':
                    alert('Download was canceled.');
                    break;
                default:
                    alert('An error occurred while downloading the file.');
                    break;
            }
        }
    };

    const renderLoadingSpinner = () => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 264px)',
                bgcolor: 'grey.100',
                borderRadius: 1
            }}
        >
            <CircularProgress />
        </Box>
    );

    const renderContent = () => {
       

        switch (fileType) {
            case "image":
                return   (
                    <Box
                    component="img"
                    src={link}
                    alt={project?.title}
                    sx={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: 'calc(100vh - 264px)',
                        margin: '0 auto',
                        display: loading ? 'none' : 'block'
                    }}
                    onLoad={() => setLoading(false)}
                />
                );

            case "text":
                return   (
                    
                    <Box
                    component="iframe"
                    src={link}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        minHeight: 'calc(100vh - 264px)',
                        display: loading ? 'none' : 'block',
                        border: 'none'
                    }}
                    onLoad={() => setLoading(false)}
                />
                );

            default:
                return (
                    <>
                        
                        <Box
                                    component="iframe"
                                    src={link}
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        minHeight: 'calc(100vh - 264px)',
                                        display: loading ? 'none' : 'block',
                                        border: 'none'
                                    }}
                                    onLoad={() => setLoading(false)}
                                />
                    </>
                );
        }
    };


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
                            width: { xs: "95%", sm: "80%" },
                            padding: { xs: "8px 24px", sm: "24px 64px" },
                            overflowY: "auto",
                            height: "calc(100vh - 64px)",
                            overflowY: "auto",
                            borderRadius: "8px"
                        }}
                    >
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ color: "#12190F", fontWeight: "700", letterSpacing: "0.9px", fontSize: { xs: "16px", sm: "18px" } }}>
                                    {project?.title}
                                </Typography>
                                <Box sx={{ display: "flex", }}>
                                    <IconButton aria-label="delete" size="small" onClick={handleClose}>
                                        <img src={Close} height={"28px"} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box pt={1} pl={2} sx={{ display: "flex", gap: 2 }}>
                                <Box onClick={downloadFile} sx={{ cursor: "pointer" }}>
                                    <img src={download} height={'28px'} />
                                </Box>
                                <Box>
                                    <img src={share} height={'28px'} />
                                </Box>

                            </Box>
                        </Box>

                        <Box sx={{ padding: "16px" }}>
                        {loading && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 'calc(100vh - 264px)',
                                    bgcolor: 'grey.50',
                                    borderRadius: 1
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        )}
                        {renderContent()}
                  

                        </Box>

                    </Box>
                </Backdrop>
            </Box>
        </>
    );
}

export default CreateProjectDetails;
