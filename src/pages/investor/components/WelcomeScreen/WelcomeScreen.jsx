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
import { useNavigate, useLocation } from "react-router-dom";
import closed from "../../../../assets/close.svg";
import welcome from "../../../../assets/welcome.svg";
import axios from "axios";
import { client } from "../../../../services/client";
import config from "../../../../config/config";
import logo from "../../../../assets/Refy.png";
import moment from "moment";

function WelcomeScreen(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const project = useSelector((state) => state.project);
    const handleClose = async () => {
        setOpen(false);
        await dispatch(projectActions?.animationStart())
        setTimeout(async () => {
            await dispatch(projectActions?.animationEnd());
        }, 4000);
    };
    const handleOpen = () => {
        setOpen(true);
    };



    const navigate = useNavigate();
    const { uuid } = useParams();
    const user = useSelector((state) => state?.auth?.user);
    const logedIn = useSelector((state) => state?.auth?.loggedIn);

    useEffect(() => {
    }, [user]);

    useEffect(() => {
        const hasVisited = localStorage.getItem('welcome');
        if (!hasVisited || hasVisited === 'false') {
            setOpen(true);
            localStorage.setItem('welcome', 'true');
        }
    }, []);

    const handleSubmit = async (e) => {
    }

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
                    open={open}
                    onClick={handleClose}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            height: "auto",
                            margin: "32px",
                            padding: "16px 16px",
                            overflowY: "auto",
                            borderRadius: "8px"
                        }}
                    >
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                                <Box></Box>

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
                                    width: { xs: "100%", sm: "800px" },
                                    p: 2,
                                    flexDirection: "column",
                                    gap: 2
                                }}
                            >
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "16px", backgroundColor: "#E6F2F2" }}>
                                    <img src={welcome} alt="welcome" />
                                </Box>

                                <Box>
                                    <Typography variant="h6" sx={{ color: "#12190F", fontWeight: "700", letterSpacing: "0.9px", fontSize: "22px" }}>
                                    Welcome to Refy!
                                    </Typography>

                                </Box>

                                <Box>
                                    <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "16px" }}>Explore curated deals, collaborate with stakeholders, and conduct due diligence all within our comprehensive platform.
                                    Discover exclusive project finance opportunities, expertly selected for investors like you.</Typography>
                                </Box>

                                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Button variant="contained"  >ok</Button>
                                </Box>


                            </Box>
                        </Box>

                    </Box>
                </Backdrop>
            </Box>
        </>
    );
}

export default WelcomeScreen;
