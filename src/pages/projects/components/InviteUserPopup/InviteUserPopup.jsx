import React, { ReactElement, useState, useEffect } from "react";
import {
    Box,
    Avatar,
    Typography,
    Button,
    Backdrop,
    IconButton,
    TextField,
    MenuItem,
    Input
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
import { useNavigate, useLocation } from "react-router-dom";
import closed from "../../../../assets/close.svg";
import axios from "axios";
import { client } from "../../../../services/client";
import config from "../../../../config/config";

const optionsDocumentsType = [
    { name: "Incorporation", value: "Incorporation" },
    { name: "Project related files", value: "Project related files" },
    { name: "Financial documents", value: "Financial documents" },
    { name: "Permits and License", value: "Permits and License" },
    { name: "Others", value: "Others" },
];


function RequestDocumentsPopup(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [link, setLink] = React.useState("");
    const [documentMulti, setDocumentMulti] = React.useState([]);
    const project = useSelector((state) => state.project);
    const handleClose = async () => {
        const authdata = await dispatch(projectActions.closeInviteOthersBackdrop());
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
    let { uuid } = useParams();
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

 

    const { email, phone } = contactmethod;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const raw = { 
            "requestType": "string",
            "subject": emailId,
            "description": description,
            "uuid": uuid
        };
        if (emailId?.length > 0) {
            const authdata = await dispatch(projectActions.inviteUser(raw));
            const closebackdrop = await dispatch(projectActions.closeInviteOthersBackdrop());
            setDescription("");
            setEmail("")

        }
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
                    open={project?.inviteOthersBackdrop}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            height: "auto",
                            maxWidth: "500px",
                            width: "500px",
                            margin: "32px",
                            padding: "24px 24px",
                            overflowY: "auto",
                            borderRadius: "8px"
                        }}
                    >

                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ color: "#12190F", fontWeight: "700", letterSpacing: "0.9px" }}>
                                    Invite
                                </Typography>
                                <IconButton aria-label="delete" size="small" onClick={handleClose}>
                                    <Box>
                                        <img src={Close} height={"24px"} />
                                    </Box>
                                </IconButton>
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

                                <Box sx={{ pt: 3, display: "flex", flexDirection: "column" }}>
                                    <label for="companyname">
                                        Email Id <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email Id"
                                        value={emailId}
                                        onChange={handleEmailChange}
                                    />
                                    {errorDocument && (
                                           <span style={{ color: "#F55B64", fontSize: "14px" }}>
                                            Select an option
                                        </span>
                                    )}
                                </Box>

                                <Box sx={{ padding: "16px 0px", width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
                                    <label for="companyname">
                                        Description (Optional)
                                    </label>

                                    <textarea
                                        style={{ width: "100%", height:"160px", borderColor:"#BCBCBC", borderRadius:"8px" , padding:"8px"}}
                                        label="Description (optional)"
                                        id="outlined-multiline-flexible"
                                        multiline
                                        maxRows={8}
                                        minRows={4}
                                        value={description}
                                        onChange={handleDescriptionChange}
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
                                    Invite
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </Backdrop>
            </Box>
        </>
    );
}

export default RequestDocumentsPopup;
