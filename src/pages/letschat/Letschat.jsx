import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../additionalDetails/components/Header";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { useNavigate, useLocation } from "react-router-dom";
import closed from "../../assets/close.svg";
import axios from "axios";
import { client } from "../../services/client";
import config from "../../config/config";

export default function Letschat() {
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

  const closeRedirect = () =>{
    if(logedIn){
      setShowPopup(false);
      navigate("/dashboard")
    }
    else{
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

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ` + config.token,
        "Content-Type": "application/json", // Adjust content type according to your API requirements
      },
    };
    const raw = JSON.stringify({
      records: [
        {
          fields: {
            Name: name,
            Email: emailId,
            ContactNo: phoneno,
            ContactByPhone: contactmethod.phone,
            ContactByEmail: contactmethod.email,
            Remarks: getStarted ? getStarted : "Capital Raising"
          },
        },
      ],
    });

    if (name?.length > 0) {
      try {
        const response = await axios.post(config.airtableUrl, raw, axiosConfig);

        console.log("Form submitted:", response);
        setShowPopup(true)
        // Optionally, you can reset the form fields after successful submission

        // Add any success handling logic here, such as showing a success message
      } catch (error) {
        console.error("Error submitting form:", error);
        // Add error handling logic here, such as showing an error message
      }
    }
  };

  return (
    <>
      <Header />

      {showPopup && (
        <Box sx={{display:"flex",justifyContent:"center", alignItems:"center", position:"absolute", height:"100vh", width:"100%",backgroundColor:'#212828', opacity:"0.9",zIndex:"2001"}}> 
          <Box onClick={closeRedirect} sx={{height:"200px",borderRadius:"8px",  width:"540px",padding:"16px", backgroundColor:"#fff", opacity:"1"}}> 
            <Box sx={{width:"100%", display:"flex", justifyContent:"flex-end", cursor:"pointer"}}>
              <img src={closed} height={"24px"} />
            </Box>
         
           <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "Satoshi-Regular",
                fontSize: "32px",
                color: "#12190F",
                fontWeight: "700",
                letterSpacing: "0.96px",
                padding:"16px"
              }}
            >
              Your query has been submitted successfully
            </Typography>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          marginTop: "60px",
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
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              mb: 2,
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
              Let's chat!
            </Typography>
            <Typography component="p" variant="p" sx={{ color: "#ABABAB" }}>
              We'd love to discuss your needs in more detail and answer any
              questions you may have. If you'd like to schedule a call with one
              of our financing and operational experts, please provide your
              contact information below:
            </Typography>
          </Box>

          <Box
            sx={{
              pt: 3,
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
              pt: 3,
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
              pt: 3,
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
              mt: 2,
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
    </>
  );
}
