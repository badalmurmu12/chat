import React, { useState } from "react";
import firebase from "../../firebase";
import {
  auth,
  signInWithGooglePopup,
  signInWithApplePopup,
} from "../../firebase";
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";
import {
  set,
  ref,
  getDatabase,
  onValue,
  remove,
  update,
} from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LeftSide from "../../components/onboarding/leftside/LeftSide";
import Header from "../additionalDetails/components/Header";
import * as authActions from "../../store/auth";
import googleIcon from "../../assets/google.svg";
import microsoftIcon from "../../assets/microsoft.svg";

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

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [emailsend, setEmailSend ] = useState(false);
  const getstarted = useSelector((state) => state?.auth?.GetStarted);

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

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      // url: 'http://localhost:3000/signin-confirm',
      url: 'https://investor.refycap.com/signin-confirm',
      // This must be true.
      handleCodeInApp: true,
    };

    let email = data.get("email");
    let password = data.get("password");
    if (email !== null && typeof email === "string") {
      try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)
          .then((response) => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            console.log("response", response);
            window.localStorage.setItem("emailForSignIn", email);
            const params = new URLSearchParams(location?.search);
            const redirectPath = params.get('redirect');
            window.localStorage.setItem("redirect", redirectPath);
            setEmailSend(true);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });

       
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
      console.log("token",response);
      const db = getDatabase();
      const regex = /[.#$\[\]@]/g;
      const path = response?.user?.email?.replace(regex, "-");
    
      const userRef = ref(db, path);
      // onValue(userRef, (snapshot) => {
      //   const data = snapshot.val();
      //   if (!!data && data?.onboarding === true) {
      //     completeOnboarding = true;
      //     debugger
      //     navigate("/dashboard"); 
      //   } else {
      //     completeOnboarding = false;
      //     if (!getstarted) {
      //       navigate("/getstarted");
      //     } else {
      //       navigate("/onboarding/termnconditions");
      //     }
      //   }
        
      // });
      // const completeOnboarding = await new Promise((resolve, reject) => {
      //   onValue(userRef, (snapshot) => {
      //     const data = snapshot.val();
      //     if (data && data.onboarding === true) {
      //       resolve(true);
      //     } else {
      //       resolve(false);
      //     }
      //   }, (error) => {
      //     reject(error);
      //   });
      // });
  
      // if (completeOnboarding) {
      //   navigate("/dashboard");
      // } else {
      //   if (!getstarted) {
      //     navigate("/getstarted");
      //   } else {
      //     navigate("/onboarding/termnconditions");
      //   }
      // }
      
      const authdata = await dispatch(authActions.loginSuccess(response, true));
      await window.localStorage?.setItem('authUser',JSON.stringify(response) )
      const params = new URLSearchParams(location?.search);
      const redirectPath = params.get('redirect');
      if (redirectPath) {
        // Decode the URL-encoded path
        const decodedPath = decodeURIComponent(redirectPath);
        navigate(redirectPath);
      } else {
        // Default redirect if no path is specified
        navigate('/project/');
      }
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };

  const logAppleUser = async () => {
    try {
      const response = await signInWithApplePopup();
      console.log(response);
      navigate("/");
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };

  return (
    <>
      <Header></Header>
      <Grid container component="main" sx={{ height: "calc(100vh - 120px)" }}>
        <CssBaseline />

        <Grid item xs={12} sm={12} md={12} component={Box} elevation={6} square sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          {!emailsend ?
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, maxWidth: "500px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: "100%",
                  mb: 1,
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontFamily: "Satoshi-Regular",
                    fontSize: "32px",
                    color: "#12190F",
                    fontWeight: "700",
                    letterSpacing: "0.96px",
                  }}
                >
                  Let’s get you started
                </Typography>
                <Typography
                  component="p"
                  variant="p"
                  sx={{
                    pt: 1,
                    color: "#818181",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                >
                  Enter your company email Id to get started.
                </Typography>
              </Box>

              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "100%",
                }}
              >
                <label for="email">Email your official Email ID</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter here"
                />
              </Box>

              <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  height: "52px",
                  textTransform: "none",
                  fontSize: "18px",
                }}
              >
                Next
              </Button>

              <Box
                sx={{
                  mt: 2,
                  mb: 2,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                Or
              </Box>

              <Button
                variant="outlined"
                fullWidth
                onClick={logGoogleUser}
                sx={{
                  mt: 1,
                  mb: 1,
                  color: " #1E293B",
                  fontSize: "16px",
                  height: "52px",
                  textTransform: "none",
                  borderWidth: "2px",
                  borderColor: "#E2E8F0",
                  borderRadius: "8px",
                }}
                startIcon={<img src={googleIcon} height={'22px'} style={{paddingRight:"4px"}}/>}
              >
                Sign In with Google
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={logAppleUser}
                sx={{
                  mt: 0,
                  mb: 1,
                  color: " #1E293B",
                  fontSize: "16px",
                  height: "52px",
                  textTransform: "none",
                  borderWidth: "2px",
                  borderColor: "#E2E8F0",
                  borderRadius: "8px",
                }}
                startIcon={<img src={microsoftIcon} height={'22px'} style={{paddingRight:"4px"}}/>}
              >
                Sign In with Microsoft
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box> :  
             <Box
             sx={{ display: "flex", justifyContent: "center", alignItems: "center" , height:'calc(100vh - 120px)'}}
           >
             <Box
               sx={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 flexDirection: "column",
                 maxWidth:"50%",
                 gap: "16px"
               }}
             >
               <Typography
                 component="h4"
                 variant="h4"
                 sx={{ color: "#12190F", fontSize: "30px", fontWeight: "700" }}
               >
                  Access Link Sent to Your Email
               </Typography>
               <Typography
                 component="p"
                 variant="p"
                 sx={{ color: "#ABABAB", fontSize: "18px", fontWeight: "500" }}
               >
                  A secure access link has been sent to your email address. Please check your inbox and click the link to log in to the Refy Platform.
               </Typography>
  
             </Box>
           </Box>}
        </Grid>
      </Grid>
    </>
  );
}
export default LoginPage;
