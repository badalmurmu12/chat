import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import * as authActions from "../../../store/auth";
import questions from "../../../assets/questions.png";
import upload from "../../../assets/upload.svg";
import { SkipNext } from "@mui/icons-material";
import { countries } from "../../../utils/country";

const optionsStage = [
  { name: "Planning", value: "planning" },
  { name: "Development", value: "development" },
  { name: "Construction", value: "construction" },
  { name: "Operation", value: "operation" },
];


const optionsSustainabilityFocus = [
  { name: "Renewable Energy", value: "Renewable Energy" },
  { name: "Energy Efficiency", value: "Energy Efficiency" },
  { name: "Sustainable Transportation", value: "Sustainable Transportation" },
  { name: "Waste Management", value: "Waste Management" },
  { name: "Water Conservation", value: "Water Conservation" },
  { name: "Biomass Biofuel", value: "Biomass Biofuel" },
  { name: "Battery", value: "Battery" },
];

export default function QuestionsProject() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [noOfEmployes, setNoOfEmployes] = useState("");
  const [sustainabilityFocus, setSustainabilityFocus] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [sustainability, setSustainability] = useState({
    renewable_energy: false,
    energy_efficiency: false,
    sustainable_transportation: false,
    waste_management: false,
    water_conservation: false,
    biomass_biofuel: false,
    other: false,
  });

  const handleChange = (event) => {
    setSustainability({
      ...sustainability,
      [event.target.name]: event.target.checked,
    });
  };

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const projectdata = useSelector((state) => state?.auth?.projectData);
  const handleLocationChange = (event, country) => {
    setLocation(country);
  };

  const handleProjectDetailsChange = (event) => {
    setProjectDetails(event.target.value);
  };
  const handleNoOfEmployesChange = (event) => {
    setNoOfEmployes(event.target.value);
  };

  const handleProjectStageChange = (event) => {
    setProjectStage(event.target.value);
  };

  const handlesuStainabilityFocusChange = (event) =>{
    setSustainabilityFocus(event.target.value)
  }

  useEffect(() => {
    setProjectDetails(projectdata?.AboutProject);
    setLocation(projectdata?.ProjectLocation);
    setProjectStage(projectdata?.projectStage);
  }, [projectdata]);

  const handleFile = (file) => {
    setFileName(file.name);
  };
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    console.log("handleFileInputChange");
    event.stopPropagation();
    const file = event.target.files[0];
    setSelectedFile(file);
    // Here you can add logic to handle the selected file
    // For example, you can upload it to a server.
  };

  const submitProject = async () => {
    const project = await dispatch(
      authActions.projectDataSuccess({
        AboutProject: projectDetails,
        ProjectLocation: location,
        ProjectStage: projectStage,
        SustainabilityFocus: sustainabilityFocus
      })
    );
    navigate("/onboarding/finance");
  };

  const skipTo = async () => {
    const project = await dispatch(
      authActions.projectDataSuccess({
        projectDetails: projectDetails,
        location: location,
        projectStage: projectStage,
        SustainabilityFocus: sustainabilityFocus
      })
    );
    navigate("/onboarding/finance");
  };

  const handleIconClick = (e) => {
    console.log("handleIconClick");
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const {
    renewable_energy,
    energy_efficiency,
    sustainable_transportation,
    waste_management,
    water_conservation,
    biomass_biofuel,
    other,
  } = sustainability;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          height: "calc(100vh - 180px)",
          width: "100%",
        }}
      >
        <CssBaseline />
        <Container
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ pt: 4, maxWidth: { md: "70%", sx: "100%" } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "700px",
              }}
            >
              <Typography
                component="p"
                variant="h6"
                color="#606060"
                sx={{
                  fontWeight: "400",
                  letterSpacing: "1px",
                  fontSize: "16px",
                }}
              >
                Step 2 of 3
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                onClick={() => skipTo()}
              >
                <Typography
                  component="p"
                  variant="h6"
                  color="#008080"
                  sx={{
                    fontWeight: "400",
                    letterSpacing: "1px",
                    fontSize: "16px",
                  }}
                >
                  Skip
                </Typography>
                <IconButton
                  aria-label="skip"
                  size="small"
                  onClick={() => skipTo()}
                >
                  <KeyboardDoubleArrowRightIcon
                    fontSize="small"
                    sx={{ color: "#008080" }}
                  />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                component="h4"
                variant="h4"
                sx={{
                  fontWeight: "600",
                  letterSpacing: "1px",
                  fontSize: "32px",
                }}
              >
                Project Overview
              </Typography>
            </Box>

            <Box component="form" sx={{ width: { xs: "100%", sm: "500px" } }}>
              <Box
                sx={{
                  pt: 3,
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "500px",
                }}
              >
                <label for="projectdescription">About Project</label>
                <textarea
                  style={{
                    borderRadius: "6px",
                    borderColor: "#ABABAB",
                    padding: "16px",
                    fontFamily: "Satoshi-Regular",
                  }}
                  type="text"
                  id="projectdescription"
                  name="projectdescription"
                  placeholder="Enter project description here"
                  value={projectDetails}
                  onChange={handleProjectDetailsChange}
                />
              </Box>

              <Box sx={{ pt: 4, maxWidth: "500px" }}>
                <label for="location">Location</label>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={countries}
                  sx={{ width: "100%", border: "0px", marginTop: "-8px" }}
                  value={location}
                  onChange={handleLocationChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{ shrink: false }}
                      SelectProps={{}}
                      margin="normal"
                      sx={{
                        border: "0px !important",
                        "& .MuiOutlinedInput-input": {
                          border: "0px !important",
                          // Class for the border around the input field
                        },
                      }}
                      size="medium"
                      label="" //{(!location || location== "")?"Search and select your location" :  "" }
                    />
                  )}
                />
              </Box>

              <Box sx={{ pt: 4, maxWidth: "500px" }}>
                <label for="projectstage">Project Stage</label>

                <TextField
                  id="outlined-select-gender"
                  select
                  label={
                    !projectStage || projectStage == ""
                      ? "Select project stage"
                      : ""
                  }
                  InputLabelProps={{ shrink: false }}
                  SelectProps={{}}
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  value={projectStage}
                  onChange={handleProjectStageChange}
                  sx={{
                    width: "100%",
                    color: "#606060",
                    marginTop: "8px",
                    "& .MuiInputLabel-root": {
                      color: "#9BA5B7 !important",
                    },
                  }}
                >
                  {optionsStage.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ pt: 4, maxWidth: "500px" }}>
                <label for="SustainabilityFocus">Sustainability Focus</label>

                <TextField
                  id="outlined-select-gender"
                  select
                  label={
                    !sustainabilityFocus || sustainabilityFocus == ""
                      ? "Select sustainability focus"
                      : ""
                  }
                  InputLabelProps={{ shrink: false }}
                  SelectProps={{}}
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  value={sustainabilityFocus}
                  onChange={handlesuStainabilityFocusChange}
                  sx={{
                    width: "100%",
                    color: "#606060",
                    marginTop: "8px",
                    "& .MuiInputLabel-root": {
                      color: "#9BA5B7 !important",
                    },
                  }}
                >
                  {optionsSustainabilityFocus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              

              <Box sx={{ pt: 3 }}>
                <label for="uploadfile">
                  Upload Any Relevant Documents, If any
                </label>
                <Box
                  sx={{
                    width: "100%",
                    border: "dashed 2px #BCBCBC",
                    borderSpacing: "8px",
                    borderWidth: "1px",

                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 4,
                      cursor: "pointer",
                    }}
                  >
                    <button
                      onClick={handleIconClick}
                      style={{
                        cursor: "pointer",
                        border: "0",
                        backgroundColor: "#fff",
                      }}
                    >
                      {/* You can replace the icon with any icon library or custom SVG */}
                      <img src={upload} alt="Upload" height="32px" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileInputChange}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        lineHeight: "32px",
                        color: "#008080",
                        fontWeight: "600",
                      }}
                    >
                      Click to upload
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#808080",
                      }}
                    >
                      Supported format : PDF, PPT, Keynote, Jpeg, PNG
                    </Typography>
                  </Box>
                </Box>
                {selectedFile && (
                  <Box>
                    <p>Selected file: {selectedFile.name}</p>{" "}
                  </Box>
                )}
              </Box>

              {/* <Box sx={{ display: "flex" }}>
                <FormControl
                  sx={{ margin: "24px 0px" }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend" sx={{ color: "#12190F" }}>
                    Sustainability Focus
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={renewable_energy}
                          onChange={handleChange}
                          name="renewable_energy"
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="Renewable Energy"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={energy_efficiency}
                          onChange={handleChange}
                          name="energy_efficiency"
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="Energy Efficiency"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={sustainable_transportation}
                          onChange={handleChange}
                          name="sustainable_transportation"
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="Sustainable Transportation"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={waste_management}
                          onChange={handleChange}
                          name="waste_management"
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="Waste Management"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={water_conservation}
                          onChange={handleChange}
                          name="water_conservation"
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="Water Conservation"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={biomass_biofuel}
                          onChange={handleChange}
                          name="biomass_biofuel"
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="Biomass Biofuel"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={other}
                          onChange={handleChange}
                          name="other"
                          sx={{
                            [`&, &.${checkboxClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="Other"
                    />
                  </FormGroup>
                </FormControl>
              </Box> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  pt: 2,
                  mb: 3,
                  pb: 3,
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    width: "30%",
                    fontSize: "20px",
                  }}
                  onClick={() => navigate("/onboarding/company")}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    width: "70%",
                    fontSize: "20px",
                  }}
                  onClick={() => submitProject()}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
