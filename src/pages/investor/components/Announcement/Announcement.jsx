import React, { ReactElement, useState, useEffect } from "react";
import {
    Box,
    Avatar,
    Typography,
    Button,
    Backdrop,
    IconButton,
    TextField,
    MenuItem
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import createproject from "../../../../assets/createproject.svg";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import * as projectActions from "../../../../store/project";
import Close from "../../../../assets/close.svg";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import {
    set,
    ref,
    getDatabase,
    onValue,
    remove,
    update,
    push,get
  } from "firebase/database";
import CardHeader from '@mui/material/CardHeader';


import { useNavigate, useLocation } from "react-router-dom";
import closed from "../../../../assets/close.svg";
import axios from "axios";
import { client } from "../../../../services/client";
import config from "../../../../config/config";
import logo from "../../../../assets/Refy.png";
import moment from "moment";

const optionsDocumentsType = [
    { name: "Incorporation", value: "Incorporation" },
    { name: "Project related files", value: "Project related files" },
    { name: "Financial documents", value: "Financial documents" },
    { name: "Permits and License", value: "Permits and License" },
    { name: "Others", value: "Others" },
];


function Announcement(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [link, setLink] = React.useState("");
    const [documentMulti, setDocumentMulti] = React.useState([]);
    const project = useSelector((state) => state.project);
    const handleClose = async () => {
        const authdata = await dispatch(projectActions.closeAnnouncementBackdrop());
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
        }
    }, [project]);

    const navigate = useNavigate();
    
    const { uuid } = useParams();
    const [name, setName] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [errorDocument, setErrorDocument] = useState(false);
    const [description, setDescription] = useState("");
    const [emailId, setEmail] = useState("");
    const user = useSelector((state) => state?.auth?.user);
    const logedIn = useSelector((state) => state?.auth?.loggedIn);
    const getStarted = useSelector((state) => state?.auth?.GetStarted);
    const [contactmethod, setContactmethod] = useState({
        email: false,
        phone: false,
    });

    const handleChange = (event) => {
        setContactmethod({
            ...contactmethod,
            [event.target.name]: event.target.checked,
        });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePhoneNoChange = (e) => {
        setPhoneno(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const closeRedirect = () => {
        if (logedIn) {
            setShowPopup(false);
            navigate("/dashboard")
        }
        else {
            setShowPopup(false);
            navigate("/")
        }

    }

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.displayName);
    }, [user]);

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day} ${month} ${year} ${hours}:${minutes}`;
      }

    const { email, phone } = contactmethod;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getDatabase();
        const path = `projects/${uuid}/timeline`;
        const timelineRef = ref(db, path);
        const data ={
            user: {
                displayName: user?.displayName,
                photoURL : user?.photoURL
            },
            files:[],
            text: description,
            subtext:"",
            timestamp: Date.now()
        }

        const timeline = await dispatch(projectActions.postTimeline(uuid, data));
        const gettimeline = await dispatch(projectActions.getTimeline(uuid));
        // try {
        //     // Get the current timeline array
        //     const snapshot = await get(timelineRef);
        //     let timeline = snapshot.val() || [];
        
        //     // Create the new entry
        //     const now = new Date();
        //     const formattedDate = formatDate(now);
        //     const newData = {}
        
        //     // Add the new entry to the timeline array
        //     timeline.push(data);
        
        //     // Update the timeline in the database
        //     await update(ref(db, `projects/${uuid}`), { timeline });
        //     dispatch(projectActions.closeAnnouncementBackdrop());
        //     console.log("Timeline updated successfully");
        //   } catch (error) {
        //     console.error("Error updating timeline:", error);
        //   }

    

    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleDocumentChange = (event) => {
        // setIndustry(event.target.value);
        setErrorDocument(false);
        const {
            target: { value },
        } = event;
        setDocumentMulti(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    function handleFocus(event) {
        event.target.style.border = 'none';
        event.target.style.outline = 'none';
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
                    open={project?.announcementBackdrop}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            height: "auto",
                            maxWidth: "500px",
                            width: "500px",
                            margin: "32px",
                            padding: "16px 16px",
                            overflowY: "auto",
                            borderRadius: "8px"
                        }}
                    >
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar src={logo} sx={{ bgcolor: "#F3F4F9", height: "64px", width: "64px" }} aria-label="recipe" variant="square">

                                        </Avatar>
                                    }

                                    title={<Box>
                                        <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}>
                                            Refy
                                        </Typography>
                                    </Box>}
                                    subheader={moment().format('LLL')}
                                />
                                <Box sx={{ display: "flex", flexDirection: "center", alignItems: "center" }}>
                                    <IconButton aria-label="delete" size="small" sx={{ height: "32px", width: "32px" }} onClick={handleClose}>
                                        <img src={Close} height={"24px"} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                height: "calc ( 100vh - 120px)",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CssBaseline />
                            <Box
                                sx={{
                                    display: "flex",
                                    width: { xs: "100%", sm: "500px" },
                                    p: 2,
                                    flexDirection: "column",
                                }}
                            >
                                <Box sx={{ padding: "0px 0px", width: "100%" }}>
                                    <textarea
                                        style={{ width: "100%", height: "200px", border: "none", borderRadius: "8px", padding: "8px", }}
                                        placeholder="What do you want to talk about?"
                                        id="outlined-multiline-flexible"
                                        multiline
                                        maxRows={8}
                                        minRows={4}
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        onFocus={handleFocus}
                                    />
                                </Box>
                                <Button
                                    onClick={handleSubmit}
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 0,
                                        mb: 2,
                                        height: "52px",
                                        textTransform: "none",
                                        fontSize: "18px",
                                    }}
                                >
                                    Post
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </Backdrop>
            </Box>
        </>
    );
}

export default Announcement;
