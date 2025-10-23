import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Backdrop,
  IconButton,
  Autocomplete,
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { countries } from "../../../utils/country";
import * as projectActions from "../../../store/project";
import { useSelector, useDispatch } from "react-redux";

const optionsStage = [
  { name: "Planning", value: "planning" },
  { name: "Development", value: "development" },
  { name: "Construction", value: "construction" },
  { name: "Operation", value: "operation" },
];

function ProjectBasicDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false);
  const [errorStage, setErrorStage] = useState(false);
  const basicData = useSelector((state) => state.project?.BasicData);

  useEffect(() => {
    setProjectDetails(basicData?.ProjectName);
    setProjectStage(basicData?.ProjectStage);
    setLocation(basicData?.ProjectLocation);
  }, [basicData]);
  const handleLocationChange = (event, country) => {
    setLocation(country);
  };
  const handleProjectDetailsChange = (event) => {
    setProjectDetails(event.target.value);
  };

  const handleProjectStageChange = (event) => {
    setProjectStage(event.target.value);
  };

  const saveToSummary = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!projectDetails || projectDetails?.length === 0) {
      newErrors.name = true;
      setErrorName(true);
    }

    if (!location || location?.length === 0) {
      newErrors.location = true;
      setErrorLocation(true);
    }

    if (!projectStage || projectStage?.trim() === "") {
      newErrors.noOfEmployes = true;
      setErrorStage(true);
    }

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const company = await dispatch(
      projectActions.projectBasicDataSuccess({
        BasicData: {
          ProjectName: projectDetails,
          ProjectLocation: location,
          ProjectStage: projectStage,
        },
      })
    );
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "calc(100vh - 160px)",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pt: 2 }}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                fontWeight: "500",
                letterSpacing: "1px",
                fontSize: "18px",
                color: "#12190f",
              }}
            >
              Enter project details
            </Typography>
          </Box>

          <Box component="form" sx={{ width: { xs: "100%", sm: "100%" } }}>
            <Box
              sx={{
                pt: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label for="projectdescription">Project Name</label>

              <input
                type="text"
                id="projectname"
                name="projectname"
                placeholder="Enter project name"
                value={projectDetails}
                onChange={handleProjectDetailsChange}
              />

              {errorName && (
                <span style={{ color: "#F55B64", fontSize: "14px" }}>
                  Input fields has to be filled before clicking next
                </span>
              )}
            </Box>

            <Box sx={{ pt: 4 }}>
              <label for="location">Project Location</label>
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

              {errorLocation && (
                <span style={{ color: "#F55B64", fontSize: "14px" }}>
                  Select Location before clicking next
                </span>
              )}
            </Box>

            <Box sx={{ pt: 4 }}>
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

              {errorStage && (
                <span style={{ color: "#F55B64", fontSize: "14px" }}>
                  Select project stage before clicking next
                </span>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, pt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              textTransform: "capitalize",
              width: "100%",
              fontSize: "20px",
            }}
            onClick={saveToSummary}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default ProjectBasicDetails;
