import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import Radio, { radioClasses } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import database  from "../../../firebase";
import { set, ref,getDatabase, onValue, remove, update } from "firebase/database";
import * as authActions from "../../../store/auth";
import axios from "axios";
import { client } from "../../../services/client";
import config from "../../../config/config";

import questions from "../../../assets/questions.png";

export default function QuestionsFinance() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [noOfEmployes, setNoOfEmployes] = useState("");
  const [financingAmount, setFinancingAmount] = useState("");
  const [paybackPeriod, setPaybackPeriod] = useState("");
  const [desiredfinancing, setDesiredfinancing] = useState("");
  const [collateralOrSecurityAvailable, setCollateralOrSecurityAvailable] =
    useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.token);
  const getstarted = useSelector((state) => state?.auth?.GetStarted);
  const finacedata = useSelector((state) => state?.auth?.finaceData);
  const projectdata = useSelector((state) => state?.auth?.projectData);
  const companyData = useSelector((state) => state?.auth?.companyData);

  const handlePaybackChange = (event) => {
    setPaybackPeriod(event.target.value);
  };
  const onChangeFinacingAmount = (event) => {
    setFinancingAmount(event.target.value);
  };

  const onChangeCollateralOrSecurityAvailable = (event) => {
    setCollateralOrSecurityAvailable(event.target.value);
  };

  const onChangeDesiredFinancing = (event) => {
    setDesiredfinancing(event.target.value);
  };
  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const handleProjectStageChange = (event) => {
    setProjectStage(event.target.value);
  };
  const handleNoOfEmployesChange = (event) => {
    setNoOfEmployes(event.target.value);
  };

  const [requirement, setRequirement] = useState({
    capital_raising: false,
    stage_financing: false,
    refinancing: false,
  });

  const handleChange = (event) => {
    setRequirement({
      ...requirement,
      [event.target.name]: event.target.checked,
    });
  };

  const onBack = async() =>{
    const company = await dispatch(
      authActions.finaceDataBack({
        CapitalRaising: requirement?.capital_raising,
        DevelopmentStageFinancing: requirement?.stage_financing,
        RefinancingAndRevolvinBridgeLoans: requirement?.refinancing,
        ExpectedPayBackPeriod: paybackPeriod,
        CollateralOrSecurityAvailable: collateralOrSecurityAvailable,
        TimeframeForFunding: timeframe,
        FinancingAmountSought: financingAmount,
      })
    );
    navigate("/onboarding/company");


  }

  useEffect(() => {
    setRequirement({
      capital_raising: finacedata?.CapitalRaising,
      stage_financing: finacedata?.DevelopmentStageFinancing,
      refinancing: finacedata?.RefinancingAndRevolvinBridgeLoans,
    });
    setPaybackPeriod(finacedata?.ExpectedPayBackPeriod);
    setCollateralOrSecurityAvailable(finacedata?.CollateralOrSecurityAvailable);
    setTimeframe(finacedata?.TimeframeForFunding);
    setFinancingAmount(finacedata?.FinancingAmountSought);
  }, [finacedata]);

  const submitData = async () => {
    const company = await dispatch(
      authActions.finaceDataSuccess({
        CapitalRaising: requirement?.capital_raising,
        DevelopmentStageFinancing: requirement?.stage_financing,
        RefinancingAndRevolvinBridgeLoans: requirement?.refinancing,
        ExpectedPayBackPeriod: paybackPeriod,
        CollateralOrSecurityAvailable: collateralOrSecurityAvailable,
        TimeframeForFunding: timeframe,
        FinancingAmountSought: financingAmount,
      })
    );

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ` + config.token,
        "Content-Type": "application/json", // Adjust content type according to your API requirements
      },
    };
    const data = {
      records: [
        {
          fields: {
            GetStarted: getstarted,
            FirstName: user?.firstName,
            LastName: user?.lastName,
            Email: user?.email,
            TnC: true,
            ...companyData,
            ...projectdata,
            CapitalRaising: requirement?.capital_raising,
            DevelopmentStageFinancing: requirement?.stage_financing,
            RefinancingAndRevolvinBridgeLoans: requirement?.refinancing,
            ExpectedPayBackPeriod: paybackPeriod,
            CollateralOrSecurityAvailable: Boolean(
              collateralOrSecurityAvailable
            ),
            TimeframeForFunding: timeframe,
          },
        },
      ],
    }
    const raw = JSON.stringify(data);

    try {

      const response = await axios.post(
        config.airtableUrlDetails,
        raw,
        axiosConfig
      );
      const db = getDatabase();
      const regex = /[.#$\[\]@]/g;
      const path = user?.email?.replace(regex, '-')
      set(ref(db, path ), {
        data:JSON.stringify({
          GetStarted: getstarted,
          FirstName: user?.firstName,
          LastName: user?.lastName,
          Email: user?.email,
          TnC: true,
          ...companyData,
          ...projectdata,
          CapitalRaising: requirement?.capital_raising,
          DevelopmentStageFinancing: requirement?.stage_financing,
          RefinancingAndRevolvinBridgeLoans: requirement?.refinancing,
          ExpectedPayBackPeriod: paybackPeriod,
          CollateralOrSecurityAvailable: Boolean(
            collateralOrSecurityAvailable
          ),
          TimeframeForFunding: timeframe,
        }),
        onboarding: true
      });

      const finance = await dispatch(authActions.finaceDataSuccess({}));
      const company = await dispatch(authActions.companyDataSuccess({}));
      const project = await dispatch(authActions.projectDataSuccess({}));

      navigate("/schedule-an-appointment");
      // Optionally, you can reset the form fields after successful submission

      // Add any success handling logic here, such as showing a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Add error handling logic here, such as showing an error message
    }  
  };

  const skipTo = async () => {
    // const company = await dispatch(authActions.finaceDataSuccess({}));
    navigate("/schedule-an-appointment");
  };

  const { capital_raising, stage_financing, refinancing } = requirement;
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
          <Box sx={{ pt: 4, maxWidth: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
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
                Step 2 of 2
              </Typography>
              {/* <Box
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
                    cursor: "pointer",
                  }}
                >
                  Skip
                </Typography>
                <IconButton aria-label="skip" size="small">
                  <KeyboardDoubleArrowRightIcon
                    fontSize="small"
                    sx={{ color: "#008080" }}
                  />
                </IconButton>
              </Box> */}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography component="h4" variant="h4">
                Financing Requirements
              </Typography>
              <Typography component="p" variant="p">
                At Refy, we offer a range of financing options tailored to your
                specific needs. Please select the financing option(s) that best
                align with your current needs and project pipeline.
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: "flex" }}>
                <FormControl
                  sx={{ margin: "24px 0px" }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormGroup>
                    <Box
                      sx={{
                        marginBottom: "16px",
                        padding: "16px 24px",
                        border: "solid 1px #C7C7C7",
                        borderRadius: "6px",
                      }}
                    >
                      <FormControlLabel
                        sx={{ fontWeight: "600" }}
                        control={
                          <Checkbox
                            checked={capital_raising}
                            onChange={handleChange}
                            name="capital_raising"
                            sx={{
                              [`&, &.${checkboxClasses.checked}`]: {
                                color: "#54AAAA",
                              },
                            }}
                          />
                        }
                        label="Capital Raising"
                      />
                      <Box sx={{ padding: "8px 32 px", color: "#797979" }}>
                        <ul>
                          <li>
                            <Typography variant="li">
                              Do you have projects that require up to 100%
                              financing? We can connect you with investors who
                              can finance a significant portion (e.g., 80%) of
                              your project, while you retain a smaller equity
                              stake (e.g., 20%).
                            </Typography>
                          </li>
                          <li>
                            <Typography variant="li">
                              With this option, you provide equity capital and
                              retain ownership of the projects over time, along
                              with attractive incentives for your continued
                              involvement.
                            </Typography>
                          </li>
                        </ul>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        marginBottom: "16px",
                        padding: "16px 24px",
                        border: "solid 1px #C7C7C7",
                        borderRadius: "6px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={stage_financing}
                            onChange={handleChange}
                            name="stage_financing"
                            sx={{
                              [`&, &.${checkboxClasses.checked}`]: {
                                color: "#54AAAA",
                              },
                            }}
                          />
                        }
                        label="Development Stage Financing"
                      />
                      <Box sx={{ padding: "8px 32 px", color: "#797979" }}>
                        <ul>
                          <li>
                            <Typography variant="li">
                              Do you have banks and/or other investors lined up
                              to finance projects once they are operational, but
                              need equity partners to kickstart the development
                              phase?
                            </Typography>
                          </li>
                          <li>
                            <Typography variant="li">
                              We can help you secure the necessary equity
                              funding to get your projects off the ground. Once
                              operational, you can assign the contract and
                              project assets to your pre-arranged investors and
                              receive upfront payments, while also benefiting
                              from backend incentives as you continue to handle
                              operations, maintenance, billing, and collection.
                            </Typography>
                          </li>
                        </ul>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        marginBottom: "16px",
                        padding: "16px 24px",
                        border: "solid 1px #C7C7C7",
                        borderRadius: "6px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={refinancing}
                            onChange={handleChange}
                            name="refinancing"
                            sx={{
                              [`&, &.${checkboxClasses.checked}`]: {
                                color: "#54AAAA",
                              },
                            }}
                          />
                        }
                        label="Refinancing and Revolving Bridge Loans"
                      />
                      <Box sx={{ padding: "8px 32 px", color: "#797979" }}>
                        <ul>
                          <li>
                            <Typography variant="li">
                              Are you looking to unlock the value of your
                              existing operating projects to generate cash for
                              new project equity or other purposes? We can
                              assist you in refinancing these assets to free up
                              capital for your growth initiatives.
                            </Typography>
                          </li>
                          <li>
                            <Typography variant="li">
                              If you're working on turn-key projects where
                              customers pay the full amount upon completion and
                              turnover, we provide access to bridge financing on
                              a rolling basis. This allows you to seamlessly
                              manage your cash flow and take on new projects
                              without interruption.
                            </Typography>
                          </li>
                        </ul>
                      </Box>
                    </Box>
                  </FormGroup>
                </FormControl>
              </Box>
              
              <Box sx={{ pt: 2, maxWidth: "400px" }}>
                <FormControl>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{ color: "#12190F" }}
                  >
                    Can You Offer Assets as Collateral?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={collateralOrSecurityAvailable}
                    onChange={onChangeCollateralOrSecurityAvailable}
                  >
                    <FormControlLabel
                      value={true}
                      control={
                        <Radio
                          sx={{
                            [`&, &.${radioClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={
                        <Radio
                          sx={{
                            [`&, &.${radioClasses.checked}`]: {
                              color: "#54AAAA",
                            },
                          }}
                        />
                      }
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ pt: 2, maxWidth: "400px" }}>
                <label for="timeframe">Timeframe for Funding</label>
                <select value={timeframe} onChange={handleTimeframeChange}>
                  <option value="immediate">Immediate</option>
                  <option value="1t3">1-3 Months</option>
                  <option value="3t6"> 3-6 Months</option>
                  <option value="6t12">6-12 Months</option>
                </select>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  pt: 2,
                  mb: 3,
                  pb: 3,
                  maxWidth: "500px",
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
                  onClick={onBack}
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
                  onClick={() => submitData()}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

// <Box
// sx={{
//   pt: 3,
//   display: "flex",
//   flexDirection: "column",
//   maxWidth: "400px",
// }}
// >
// <label for="desiredfinancing">Desired Financing Terms</label>
// <input
//   type="text"
//   id="desiredfinancing"
//   name="desiredfinancing"
//   placeholder=""
//   value={desiredfinancing}
//   onChange={onChangeDesiredFinancing}
// />
// </Box>
