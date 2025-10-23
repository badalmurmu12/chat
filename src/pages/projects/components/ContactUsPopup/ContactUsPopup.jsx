import React, { ReactElement, useState, useEffect } from "react";
import {
    Box,
    Avatar,
    Typography,
    Button,
    Backdrop,
    IconButton,
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



function ContactUsPopup(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [link, setLink] = React.useState("");
    const project = useSelector((state) => state.project);
    const handleClose = async () => {
        const authdata = await dispatch(projectActions.closeContactUsBackdrop());
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
    let { type } = useParams();
    const [name, setName] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [showPopup, setShowPopup] = useState(false);
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

    const { email, phone } = contactmethod;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const raw = {
            records: [
                {
                    fields: {
                        Name: name,
                        Email: emailId,
                        ContactNo: phoneno,
                        ContactByPhone: contactmethod.phone,
                        ContactByEmail: contactmethod.email,
                        Remarks: "Invester Connect"
                    },
                },
            ],
        };

         const authdata = await dispatch(projectActions.contactUsAir(raw));
         const closebackdrop = await dispatch(projectActions.closeContactUsBackdrop());
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
                    open={project?.contactUsBackdrop}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            height: {sm:"auto", xs: "90vh"},
                            maxwidth: "700px",
                            width:"700px",
                            margin: "32px",
                            padding: {sm:"24px 64px", xs: "64px 24px"},
                            overflowY: "auto",
                            borderRadius:"8px"
                        }}
                    >

                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ color: "#12190F", fontWeight: "700", letterSpacing: "0.9px" }}>
                                    Let's connect
                                </Typography>
                                <IconButton aria-label="delete" size="small" onClick={handleClose}>
                                    <Box>
                                        <img src={Close} height={"24px"} />
                                    </Box>
                                </IconButton>
                            </Box>
                            <Box pt={1}>
                                <Typography
                                    variant="h6"
                                    sx={{ color: "#9C9C9C", fontSize: "14px", fontWeight: "500" }}
                                >
                                    We'd love to discuss your needs in more detail and answer any questions you may have. If you'd like to schedule a call with one of our financing and operational experts, please provide your contact information below:
                                </Typography>
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

                                <Box
                                    sx={{
                                        pt: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        maxWidth: "100%",
                                    }}
                                    component="form"
                                >
                                    <label for="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter here"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        pt: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        maxWidth: "100%",
                                    }}
                                >
                                    <label for="email">Email Address</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={emailId}
                                        onChange={handleEmailChange}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        pt: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        maxWidth: "100%",
                                    }}
                                >
                                    <label for="phone">Phone number</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter here"
                                        value={phoneno}
                                        onChange={handlePhoneNoChange}
                                    />
                                </Box>

                                <Box sx={{ display: "flex" }}>
                                    <FormControl
                                        sx={{ margin: "24px 0px" }}
                                        component="fieldset"
                                        variant="standard"
                                    >
                                        <FormLabel component="legend" sx={{ color: "#12190F" }}>
                                            Preferred Contact Method
                                        </FormLabel>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={email}
                                                        onChange={handleChange}
                                                        name="email"
                                                        sx={{
                                                            [`&, &.${checkboxClasses.checked}`]: {
                                                                color: "#54AAAA",
                                                            },
                                                        }}
                                                    />
                                                }
                                                label="Email"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={phone}
                                                        onChange={handleChange}
                                                        name="phone"
                                                        sx={{
                                                            [`&, &.${checkboxClasses.checked}`]: {
                                                                color: "#54AAAA",
                                                            },
                                                        }}
                                                    />
                                                }
                                                label="Phone"
                                            />
                                        </FormGroup>
                                    </FormControl>
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
                                    Submit
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </Backdrop>
            </Box>
        </>
    );
}

export default ContactUsPopup;
