import React, { useState } from "react";
import firebase from "../../firebase";
import {
  auth,
  signInWithGooglePopup,
  signInWithApplePopup,
} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import sideImage from "../../assets/sideImage.png";
import capital from "../../assets/capital.svg";
import loan from "../../assets/loan.svg";
import advisory from "../../assets/advisory.svg";
import LeftSide from "../../components/onboarding/leftside/LeftSide";
import * as authActions from "../../store/auth";
import Header from "../additionalDetails/components/Header";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://refycap.com/">
        refycap.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [type, setType] = useState("");
  const user = useSelector((state) => state?.auth);

  const loginWithUsernameAndPassword = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("./");
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    let email = data.get("email");
    let password = data.get("password");
    if (
      email !== null &&
      typeof email === "string" &&
      password !== null &&
      typeof password === "string"
    ) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch {
        setNotice("You entered a wrong username or password.");
      }
    } else {
      // Handle the case where the value is null or not a string
    }
  };

  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      navigate("/");
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };

  const logAppleUser = async () => {
    try {
      const response = await signInWithApplePopup();
      navigate("/");
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };
  const handleChange = (e) => {
    setType(e.target.value);
  };
  const handleChangeType = (typ) => {
     
      setType(typ);
  };

  const nextNavigation = async () => {
    if (user?.loggedIn) {
      if (type === "developer") {
        const tnc = await dispatch(authActions.getStarted("Capital Raising"));
        navigate("/onboarding/termnconditions");
      }
      else if (type === "investor") {
        const tnc = await dispatch(
          authActions.getStarted("Strategic Financial Advisory")
        );
        navigate("/lets-chat");
      } else if (type === "others") {
        const tnc = await dispatch(
          authActions.getStarted("Loan Application and Due Diligence Support")
        );
        navigate("/lets-chat");
      }
    } else {
      if (type === "developer") {
        const tnc = await dispatch(authActions.getStarted("Capital Raising"));
        navigate("/login");
      }
      else if (type === "investor") {
        const tnc = await dispatch(
          authActions.getStarted("Strategic Financial Advisory")
        );
        navigate("/lets-chat");
      } else if (type === "others") {
        const tnc = await dispatch(
          authActions.getStarted("Loan Application and Due Diligence Support")
        );
        navigate("/lets-chat");
      }
    }
  };
  return (
    <>
      <Header />
      <Grid
        container
        component="main"
        sx={{
          height: "calc(100vh - 120px)",
          overflowY: "scroll",
          paddingTop: "60px",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Box}
          elevation={6}
          sx={{ display: "flex", alignItems: "center" }}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "auto",
              justifyContent: "center",
              maxWidth: "700px",
              maxHeight: "140px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                flexDirection: "column",
                padding: { xs: "0px 8px", md: "0px" },
                gap: 1,
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontSize: "32px",
                  color: "#12190F",
                  fontWeight: "700",
                  fontFamily: "Satoshi-Medium",
                  letterSpacing: "0.052em",
                }}
              >
                Welcome to Refy
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontSize: "16px", color: "#797979", lineHeight: "25px" }}
              >
                How do you want to get started?
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 2,
                padding: { xs: "8px", md: "0px" },
                maxWidth: "700px",
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="developer"
                  value={type}
                  name="radio-buttons-group"
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                >
                  <Box
                    onClick={() => handleChangeType("developer")}
                    sx={{
                      display: { xs: "flex", md: "none" },
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor:
                        type === "developer"
                          ? "rgb(230, 242, 242, 1)"
                          : "#ffffff",
                      border:
                        type === "developer"
                          ? "solid  rgb(0,128,128,1) 1px"
                          : "solid  rgb(199,199,199,1) 1px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          margin: "16px",
                          backgroundColor:
                            type === "developer" ? "#B0D8D8" : "#E6F2F2",
                          height: "48px",
                          width: "48px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "6px",
                        }}
                      >
                        <img src={capital} width="24px" />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "48px",
                          width: "32px",
                          marginRight: "0px",
                          marginTop: "4px",
                        }}
                      >
                        <FormControlLabel
                          value="developer"
                          control={<Radio />}
                          label=""
                          sx={{ marginLeft: "0px" }}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        padding: "0px 16px 16px 16px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        component="h4"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "700",
                          fontSize: "20px",
                          color: "#12190F",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Capital Raising
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#ABABAB",
                        }}
                      >
                        I have sustainability-linked projects that require
                        financing to proceed to the next stage of development.
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    onClick={() => handleChangeType("developer")}
                    sx={{
                      display: { xs: "none", md: "flex" },
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor:
                        type === "developer"
                          ? "rgb(230, 242, 242, 1)"
                          : "#ffffff",
                      border:
                        type === "developer"
                          ? "solid  rgb(0,128,128,1) 1px"
                          : "solid  rgb(199,199,199,1) 1px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        margin: "16px",
                        backgroundColor:
                          type === "developer" ? "#B0D8D8" : "#E6F2F2",
                        height: "104px",
                        width: "94px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                      }}
                    >
                      <img src={capital} width="42px" />
                    </Box>
                    <Box
                      sx={{
                        margin: "16px 0px",
                        width: "500px",
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        component="h4"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "700",
                          fontSize: "20px",
                          color: "#12190F",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Capital Raising
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#ABABAB",
                        }}
                      >
                        I have sustainability-linked projects that require
                        financing to proceed to the next stage of development.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "104px",
                        width: "58px",
                      }}
                    >
                      <FormControlLabel
                        value="developer"
                        control={<Radio />}
                        label=""
                        sx={{ marginLeft: "0px" }}
                      />
                    </Box>
                  </Box>

                  <Box
                    onClick={() => handleChangeType("investor")}
                    sx={{
                      mt: 1,
                      display: { xs: "flex", md: "none" },
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor:
                        type === "investor"
                          ? "rgb(230, 242, 242, 1)"
                          : "#ffffff",
                      border:
                        type === "investor"
                          ? "solid  rgb(0,128,128,1) 1px"
                          : "solid  rgb(199,199,199,1) 1px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          margin: "16px",
                          backgroundColor:
                            type === "investor" ? "#B0D8D8" : "#E6F2F2",
                          height: "48px",
                          width: "48px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "6px",
                        }}
                      >
                        <img src={advisory} width="24px" />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "48px",
                          width: "32px",
                          marginRight: "0px",
                          marginTop: "4px",
                        }}
                      >
                        <FormControlLabel
                          value="investor"
                          control={<Radio />}
                          label=""
                          sx={{ marginLeft: "0px" }}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        padding: "0px 16px 16px 16px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        component="h4"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "700",
                          fontSize: "20px",
                          color: "#12190F",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Strategic Financial Advisory
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#ABABAB",
                        }}
                      >
                        I have engaged with potential investors and require
                        assistance in structuring the deal and developing robust
                        financial models to support my fundraising efforts.
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    onClick={() => handleChangeType("investor")}
                    sx={{
                      mt: 1,
                      display: { xs: "none", md: "flex" }, //{sx : "none" , md:"flex"},
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor:
                        type === "investor"
                          ? "rgb(230, 242, 242, 1)"
                          : "#ffffff",
                      border:
                        type === "investor"
                          ? "solid  rgb(0,128,128,1) 1px"
                          : "solid  rgb(199,199,199,1) 1px",
                      cursor: "pointer",
                      maxWidth: " 700x",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        margin: "16px",
                        backgroundColor:
                          type === "investor" ? "#B0D8D8" : "#E6F2F2",
                        height: "104px",
                        width: "94px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                      }}
                    >
                      <img src={advisory} width="42px" />
                    </Box>
                    <Box
                      sx={{
                        margin: "16px 0px",
                        width: "500px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        component="h4"
                        sx={{
                          fontFamily: "Satoshi-Medium",

                          letterSpacing: "0.052em",
                          fontWeight: "700",
                          fontSize: "20px",
                          color: "#12190F",
                        }}
                      >
                        Strategic Financial Advisory
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#ABABAB",
                        }}
                      >
                        I have engaged with potential investors and require
                        assistance in structuring the deal and developing robust
                        financial models to support my fundraising efforts.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "104px",
                        width: "48px",
                      }}
                    >
                      <FormControlLabel
                        value="investor"
                        control={<Radio />}
                        label=""
                      />
                    </Box>
                  </Box>

                  <Box
                    onClick={() => handleChangeType("others")}
                    sx={{
                      mt: 1,
                      display: { xs: "flex", md: "none" },
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor:
                        type === "others" ? "rgb(230, 242, 242, 1)" : "#ffffff",
                      border:
                        type === "others"
                          ? "solid  rgb(0,128,128,1) 1px"
                          : "solid  rgb(199,199,199,1) 1px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          margin: "16px",
                          backgroundColor:
                            type === "others" ? "#B0D8D8" : "#E6F2F2",
                          height: "48px",
                          width: "48px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "6px",
                        }}
                      >
                        <img src={loan} width="24px" />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "48px",
                          width: "32px",
                          marginRight: "0px",
                          marginTop: "4px",
                        }}
                      >
                        <FormControlLabel
                          value="others"
                          control={<Radio  />}
                          label=""
                          sx={{ marginLeft: "0px" }}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        padding: "0px 16px 16px 16px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        component="h4"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "700",
                          fontSize: "20px",
                          color: "#12190F",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Loan Application and Due Diligence Support
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#ABABAB",
                        }}
                      >
                        I need professional support to manage the loan
                        application process and handle due diligence inquiries
                        from potential investors or lenders.
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    onClick={() => handleChangeType("others")}
                    sx={{
                      mt: 1,
                      display: { xs: "none", md: "flex" },
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor:
                        type === "others" ? "rgb(230, 242, 242, 1)" : "#ffffff",
                      border:
                        type === "others"
                          ? "solid  rgb(0,128,128,1) 1px"
                          : "solid  rgb(199,199,199,1) 1px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        margin: "16px",
                        backgroundColor:
                          type === "others" ? "#B0D8D8" : "#E6F2F2",
                        height: "104px",
                        width: "94px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                      }}
                    >
                      <img src={loan} width="42px" />
                    </Box>
                    <Box
                      sx={{
                        margin: "16px",
                        width: "500px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        component="h4"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "700",
                          fontSize: "20px",
                          color: "#12190F",
                          letterSpacing: "0.052em",
                        }}
                      >
                        Loan Application and Due Diligence Support
                      </Typography>
                      <Typography
                        component="h6"
                        sx={{
                          fontFamily: "Satoshi-Medium",
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#ABABAB",
                        }}
                      >
                        I need professional support to manage the loan
                        application process and handle due diligence inquiries
                        from potential investors or lenders.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "104px",
                        width: "68px",
                      }}
                    >
                      <FormControlLabel
                        value="others"
                        control={<Radio color="primary"  />}
                        label=""
                        sx={{ ml: "0px" }}
                      />
                    </Box>
                  </Box>
                </RadioGroup>
              </FormControl>

              {/* <Grid container>
              <Grid item sx={{ mt: 3, display:"flex", flexDirection:"row", gap: 1, alignItems:"center" }}>
                <Box sx={{fontFamily:'Satoshi-Light', fontSize: "14px", fontWeight:"700", color:"#ABABAB"}} >Already have an account?</Box>
                <Link href="/login" variant="body2" sx={{fontWeight:"600"}}>
                  { "LOGIN"}
                </Link>
              </Grid>
            </Grid> */}
              <Button
                fullWidth
                variant="contained"
                onClick={() => nextNavigation()}
                sx={{
                  mt: 1.6,
                  mb: 2,
                  height: "52px",
                  textTransform: "none",
                  fontSize: "18px",
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default LandingPage;
