import React, { useState } from "react";
import firebase from "../../firebase";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { signInWithGooglePopup, signInWithApplePopup } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LeftSide from "../../components/onboarding/leftside/LeftSide";
import VerificationEmail from "../../components/onboarding/verificationemail/VerificationEmail";
import Header from "../additionalDetails/components/Header";
import sideImage from "../../assets/sideImage.png";

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

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [sendEmailVerification, setSendEmailVerification] = useState(false);

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
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
   
        await sendEmailVerification(user.user).then((res) => {
          console.log("res", res);
          setSendEmailVerification(true)
        });
        // navigate("/");
       
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
      // navigate("/");
      setSendEmailVerification(true)
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };

  const logAppleUser = async () => {
    try {
      const response = await signInWithApplePopup();
      console.log(response);
      setSendEmailVerification(true)
      // navigate("/");
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };
  return (
    <> <Header></Header>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
 
      <Grid item xs={12} sm={12} md={12} component={Box} elevation={6} square>
        {sendEmailVerification ? (
          <VerificationEmail />
        ) : (
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
              sx={{ mt: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  mb: 2,
                }}
              >
                <Typography component="h1" variant="h5">
                  Let’s get you started
                </Typography>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid item>
                  <Link href="login" variant="body2">
                    {"Already have an account? LOGIN"}
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={logGoogleUser}
                sx={{ mt: 1, mb: 1 }}
              >
                Sign In with Google
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={logAppleUser}
                sx={{ mt: 1, mb: 1 }}
              >
                Sign In with Apple
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
    </>
  );
}
export default SignUpPage;
