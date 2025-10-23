import React, { useState, useEffect } from "react";
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
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import {
  set,
  ref,
  getDatabase,
  onValue,
  remove,
  update,
} from "firebase/database";
import { useNavigate } from "react-router-dom";
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
import googleIcon from "../../assets/google.png";
import microsoftIcon from "../../assets/microsoft.png";

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

function SigninConfirm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [loggedinSuccess, setLoggedinSuccess] = useState(false);
  const [loggedinMessage, setLoggedinMessage] = useState("Checking ...");
  const [subloggedinMessage, setSubLoggedinMessage] = useState("");
  const getstarted = useSelector((state) => state?.auth?.GetStarted);

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      let redirectPath = window.localStorage.getItem('redirect');
      signInWithEmailLink(auth, email ?? '', window.location.href)
        .then(async(response) => {
          setLoggedinMessage('Logging in with your mail')
          setSubLoggedinMessage('Email Has been verified Sucessfully.')
           console.log('signInWithEmailLink', response);
 
           const authdata = await dispatch(authActions.loginSuccess(response));
           await window.localStorage?.setItem('authUser',JSON.stringify(response) )
           if (redirectPath) {
             // Decode the URL-encoded path
             const decodedPath = decodeURIComponent(redirectPath);
             navigate(redirectPath);
           } else {
             // Default redirect if no path is specified
             navigate('/project/');
           }
        })
        .catch((error) => {
          console.log('error',error);
          setLoggedinMessage('Logging in with your mail failed')
          setSubLoggedinMessage('The email provided does not match the sign-in email address.')
      
        });
      }
  }, []);

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
      url: 'http://localhost:3000/signin-confirm',
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
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });

        window.localStorage.setItem("emailForSignIn", email);
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
     
      console.log(response);
      const db = getDatabase();
      const regex = /[.#$\[\]@]/g;
      const path = response?.user?.email?.replace(regex, "-");
      const userRef = ref(db, path);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (!!data && data?.onboarding === true) {
          navigate("/home");
          
        } else {
          console.log("Data not found");
          if (!getstarted) {
            navigate("/getstarted");
          } else {
            navigate("/onboarding/termnconditions");
          }
        }
        
      });
      const authdata = await dispatch(authActions.loginSuccess(response));
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

        <Grid item xs={12} sm={12} md={12} component={Box} elevation={6} square>
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
            sx={{ color: "#12190F", fontSize: "32px", fontWeight: "700" }}
          >
            {loggedinMessage}
          </Typography>
          <Typography
            component="p"
            variant="p"
            sx={{ color: "#ABABAB", fontSize: "18px", fontWeight: "500" }}
          >
            {subloggedinMessage}
          </Typography>
      
        </Box>
      </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default SigninConfirm;
