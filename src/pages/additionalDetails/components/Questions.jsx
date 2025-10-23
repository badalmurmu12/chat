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
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as authActions from "../../../store/auth";
import CssBaseline from "@mui/material/CssBaseline";
import { FileUploader } from "./FileUploader";
import questions from "../../../assets/questions.png";
import upload from "../../../assets/upload.svg";
import Checkbox from "@mui/material/Checkbox";

const genders = [
  {
    value: "M",
    label: "Male",
  },
  {
    value: "F",
    label: "Female",
  },
  {
    value: "O",
    label: "Other",
  },
];

const optionsNoOfEmployees = [
  { name: "1 - 10", value: "1-10" },
  { name: "11 - 20", value: "11-20" },
  { name: "20 - 50", value: "21-50" },
  { name: "51 - 100", value: "51-100" },
  { name: "100 - 1000", value: "100-1000" },
  { name: "1000+", value: "1000+" },
];

const optionsIndustry = [
  { name: "Renewable Energy", value: "Renewable Energy" },
  { name: "Energy Efficiency", value: "Energy Efficiency" },
  { name: "Sustainable Transportation", value: "Sustainable Transportation" },
  { name: "Waste Management", value: "Waste Management" },
  { name: "Water Conservation", value: "Water Conservation" },
  { name: "Biomass Biofuel", value: "Biomass Biofuel" },
  { name: "Battery", value: "Battery" },
  { name: "Others", value: "Others" },
];

const optionsRevenue = [
  { name: "Less than $250k", value: "$250k" },
  { name: "$250k - $1M", value: "$250k-$1M" },
  { name: "$1M - $5M", value: "$1M-$5M" },
  { name: "More than $5M", value: ">$5M" },
];

export default function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyname, setCompanyname] = useState("");
  const [foundedyear, setFoundedyear] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [industryMulti, setIndustryMulti] = React.useState([]);
  const [url, setUrl] = useState("");
  const [revenue, setRevenue] = useState("");
  const [noOfEmployes, setNoOfEmployes] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [others, setOthers] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorYear, setErrorYear] = useState(false);
  const [errorEmployee, setErrorEmployee] = useState(false);
  const [errorIndustry, setErrorIndustry] = useState(false);
  const [error, setError] = useState({
    companyName: false,
    foundedyear: false,
    noOfEmployes: false,
  });

  const state = useSelector((state) => state);
  const companydata = useSelector((state) => state?.auth?.companyData);
  const handleFile = (file) => {
    setFileName(file.name);
  };
  const fileInputRef = useRef(null);

  const uploadFiles = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `company/${file.name}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadUrl) => {
        // uploadComplete(downloadUrl);
        console.log("downloadUrl", downloadUrl);
        setUrl(downloadUrl);
      });
  };

  const handleFileInputChange = (event) => {
    console.log("handleFileInputChange");
    event.stopPropagation();
    const file = event.target.files[0];
    setSelectedFile(file);
    uploadFiles(file);
    // Here you can add logic to handle the selected file
    // For example, you can upload it to a server.
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: companydata?.CompanyName,
      foundedyear: companydata?.YearFound
        ? parseInt(companydata?.YearFound)
        : "",
      noOfEmployes: companydata?.NumberOfEmployee,
    },
  });

  const handleIconClick = (e) => {
    console.log("handleIconClick");
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleCompanyNameChange = (event) => {
    setErrorName(false);
    setCompanyname(event.target.value);
  };

  const handleFoundedYearChange = (event) => {
    setErrorYear(false);
    setFoundedyear(event.target.value);
  };
  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handleIndustryChange = (event) => {
    // setIndustry(event.target.value);
    setErrorIndustry(false);
    const {
      target: { value },
    } = event;
    setIndustryMulti(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleRevenueChange = (event) => {
    setRevenue(event.target.value);
  };
  const handleOthersChange = (event) => {
    setOthers(event.target.value);
  };
  const handleNoOfEmployesChange = (event) => {
    setErrorEmployee(false);
    setNoOfEmployes(event.target.value);
  };

  const user = useSelector((state) => state.user);
  useEffect(() => {
    setCompanyname(companydata?.CompanyName);
    setFoundedyear(
      companydata?.YearFound ? parseInt(companydata?.YearFound) : ""
    );
    setIndustry(companydata?.Industry);
    let industryMulti = [];

    if (companydata?.RenewableEnergy) industryMulti.push("Renewable Energy");
    if (companydata?.EnergyEfficiency) industryMulti.push("Energy Efficiency");
    if (companydata?.SustainableTransportation)
      industryMulti.push("Sustainable Transportation");
    if (companydata?.WasteManagement) industryMulti.push("Waste Management");
    if (companydata?.WaterConservation) industryMulti.push("Water Conservation");
    if (companydata?.BiomassBiofuel) industryMulti.push("Biomass Biofuel");
    if (companydata?.Battery) industryMulti.push("Battery");

    setIndustryMulti(industryMulti);
    setWebsite(companydata?.Website);
    setNoOfEmployes(companydata?.NumberOfEmployee);
    setRevenue(companydata?.AnnualRevenue);
  }, [companydata]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!companyname || companyname?.length === 0) {
      newErrors.name = true;
      setErrorName(true);
    }

    if (!foundedyear || foundedyear?.length === 0) {
      newErrors.year = true;
      setErrorYear(true);
    }

    if (!noOfEmployes || noOfEmployes?.trim() === "") {
      newErrors.noOfEmployes = true;
      setErrorEmployee(true);
    }
    if (!industryMulti || industryMulti?.length === 0) {
      newErrors.industry = true;
      setErrorIndustry(true);
    }
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const company = await dispatch(
      authActions.companyDataSuccess({
        CompanyName: companyname,
        YearFound: parseInt(foundedyear),
        Website: website,
        RenewableEnergy: industryMulti.includes("Renewable Energy"),
        EnergyEfficiency: industryMulti.includes("Energy Efficiency"),
        SustainableTransportation: industryMulti.includes(
          "Sustainable Transportation"
        ),
        WasteManagement: industryMulti.includes("Waste Management"),
        WaterConservation: industryMulti.includes("Water Conservation"),
        BiomassBiofuel: industryMulti.includes("Biomass Biofuel"),
        Battery: industryMulti.includes("Battery"),
        AnnualRevenue: revenue,
        NumberOfEmployee: noOfEmployes,
        IndustryOther: others ? others : "",
        Url: url,
      })
    );
    navigate("/onboarding/finance");
  };
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
            backgroundRepeat: "no-repeat",
            backgroundColor: "#ffffff",
            backgroundPosition: "right 0% bottom 45%",
          }}
        >
          <Box sx={{ pt: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                component="p"
                variant="h6"
                color="#606060"
                sx={{
                  fontWeight: "400",
                  letterSpacing: "1px",
                  fontSize: "18px",
                }}
              >
                Step 1 of 2
              </Typography>
              <Typography
                component="h4"
                variant="h4"
                sx={{
                  fontWeight: "600",
                  letterSpacing: "1px",
                  fontSize: "32px",
                }}
              >
                Company Information
              </Typography>
            </Box>

            <Box sx={{ mt: 1, maxWidth: "500px" }}>
              <Box sx={{ pt: 3, width: { md: "500px", sx: "100%" } }}>
                <label for="companyname">
                  Company Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="companyname"
                  name="companyname"
                  placeholder="Enter your organisation name"
                  value={companyname}
                  onChange={handleCompanyNameChange}
                />
                {errorName && (
                  <span style={{ color: "#F55B64", fontSize: "14px" }}>
                    Input fields has to be filled before clicking next
                  </span>
                )}
              </Box>
              <Box sx={{ pt: 3 }}>
                <label for="foundedyear">
                  Year Founded <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="foundedyear"
                  name="foundedyear"
                  placeholder="Enter year"
                  value={foundedyear}
                  onChange={handleFoundedYearChange}
                />
                {errorYear && (
                  <span style={{ color: "#F55B64", fontSize: "14px" }}>
                    Input fields has to be filled before clicking next
                  </span>
                )}
              </Box>
              <Box sx={{ pt: 3 }}>
                <label for="industry">
                  Industry<span style={{ color: "red" }}>*</span>
                </label>

                <TextField
                  id="outlined-select-gender"
                  select
                  label={
                    !industryMulti || industryMulti.length == 0
                      ? "Select your industry"
                      : ""
                  }
                  InputLabelProps={{ shrink: false }}
                  SelectProps={{
                    multiple: true,
                    value: industryMulti,
                    onChange: handleIndustryChange,
                    renderValue: (selected) => selected.join(", "),
                  }}
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  multiple
                  value={industryMulti}
                  onChange={handleIndustryChange}
                  sx={{
                    width: "100%",
                    color: "#606060",
                    marginTop: "8px",

                    "& .MuiInputLabel-root": {
                      color: "#9BA5B7 !important",
                    },
                  }}
                >
                  {optionsIndustry.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox
                        checked={industryMulti.indexOf(option.value) > -1}
                      />
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                {errorIndustry && (
                  <span style={{ color: "#F55B64", fontSize: "14px" }}>
                    Select an option
                  </span>
                )}
              </Box>
              {industryMulti.indexOf("Others") > -1 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#5E5E5E", fontSize: "16px" }}
                  >
                    Enter your Industry:
                  </Typography>
                  <TextField
                    id="standard-basic"
                    label=""
                    variant="standard"
                    InputLabelProps={{ shrink: false }}
                    value={others}
                    onChange={handleOthersChange}
                    sx={{
                      border: "0px",
                      border: "0px !important",
                      "& .MuiInput-input": {
                        border: "0px !important",
                        // Class for the border around the input field
                      },
                    }}
                  />
                </Box>
              )}

              <Box sx={{ pt: 3 }}>
                <label for="noOfEmployes">
                  Number of Employees<span style={{ color: "red" }}>*</span>
                </label>
                <TextField
                  id="outlined-select-gender"
                  select
                  label={
                    !noOfEmployes || noOfEmployes == ""
                      ? "Select an option"
                      : ""
                  }
                  InputLabelProps={{ shrink: false }}
                  SelectProps={{}}
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  value={noOfEmployes}
                  onChange={handleNoOfEmployesChange}
                  sx={{
                    width: "100%",
                    color: "#606060",
                    marginTop: "8px",
                    "& .MuiInputLabel-root": {
                      color: "#9BA5B7 !important",
                    },
                  }}
                >
                  {optionsNoOfEmployees.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errorEmployee && (
                  <span style={{ color: "#F55B64", fontSize: "14px" }}>
                    Select an option
                  </span>
                )}
              </Box>

              {/* <Box sx={{ pt: 3 }}>
                <label for="noOfEmployes">
                  Number of Employees<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  value={noOfEmployes}
                  onChange={handleNoOfEmployesChange}
                >
                  <option value="">Select an option</option>
                  <option value="1-10">1 - 10</option>
                  <option value="11-20">11 - 20</option>
                  <option value="21-50">20 - 50</option>
                  <option value="51-100">51 - 100</option>
                  <option value="100-1000">100 - 1000</option>
                  <option value="1000+">1000+</option>
                </select>
                {errorEmployee && (
                  <span style={{ color: "#F55B64", fontSize: "14px" }}>
                    Select an option
                  </span>
                )}
              </Box> */}
              <Box sx={{ pt: 3 }}>
                <label for="revenue">Annual Revenue (In USD)</label>

                <TextField
                  id="outlined-select-gender"
                  select
                  label={!revenue || revenue == "" ? "Select an option" : ""}
                  InputLabelProps={{ shrink: false }}
                  SelectProps={{}}
                  margin="normal"
                  variant="outlined"
                  size="medium"
                  value={revenue}
                  onChange={handleRevenueChange}
                  sx={{
                    width: "100%",
                    color: "#606060",
                    marginTop: "8px",
                    "& .MuiOutlinedInput-root": {
                      // Class for the border around the input field
                    },
                    "& .MuiInputLabel-root": {
                      color: "#9BA5B7 !important",
                    },
                  }}
                >
                  {optionsRevenue.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ pt: 3 }}>
                <label for="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  placeholder=""
                  value={website}
                  onChange={handleWebsiteChange}
                />
              </Box>
              <Box sx={{ pt: 3 }}>
                <label for="uploadfile">
                  Upload Any relevant Company presentation, If any
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

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  pt: 2,
                }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    width: "100%",
                    fontSize: "18px",
                  }}
                  onClick={(e) => handleSubmitForm(e)}
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
