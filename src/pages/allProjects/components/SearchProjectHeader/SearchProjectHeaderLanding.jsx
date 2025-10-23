import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography, Box, Button, Avatar, CircularProgress, Paper,
  Container,
  TextField,
  MenuItem,
  Autocomplete, Checkbox, InputAdornment
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import * as authActions from "../../../../store/auth";
import * as projectActions from "../../../../store/project";
import search_landing from "../../../../assets/search_landing.svg";
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import logo from "../../../../assets/logo.png";
import Refy from "../../../../assets/Refy.png";
import logoutImg from "../../../../assets/logout.svg";
import Sort from '../Sort/Sort';
import Filter from "../Filter/Filter";
import useDebounce from './useDebounce';
import { countries } from "../../../../utils/country";
import { Search, File, DollarSign, Earth } from 'lucide-react';


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(1),
//   marginLeft: theme.spacing(1),
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000000',
  width: '100%',
  height: '48px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#fff !important',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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

const optionsProjectStage = [
  { name: "Planning", value: "Planning" },
  { name: "Development", value: "Development" },
  { name: "Construction", value: "Construction" },
  { name: "Operational", value: "Operational" },
];

const optionsFundSize = [
  { name: "Less than $1M", value: "<$1M" },
  { name: "$1M - $5M", value: "$1M-$5M" },
  { name: "$5M - $10M", value: "$5M-$10M" },
  { name: "$10M - $50M", value: "$10M-$50M" },
  { name: "More than $50M", value: ">$50M" },
];


function MenuTransitions() {
  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
}
const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    z-index: 1;
  
    .closed & {
      opacity: 0;
      transform: scale(0.95, 0.8);
      transition: opacity 200ms ease-in, transform 200ms ease-in;
    }
    
    .open & {
      opacity: 1;
      transform: scale(1, 1);
      transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
    }
  
    .placement-top & {
      transform-origin: bottom;
    }
  
    .placement-bottom & {
      transform-origin: top;
    }
    `,
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};



const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
    `,
);


function SearchProjectHeaderLanding() {
  const { uuid } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = React.useState(0);
  const [parsedData, setParsedData] = useState(null);
  const [industry, setIndustry] = useState("");
  const [locationCountry, setLocationCOuntry] = useState("");
  const [industryMulti, setIndustryMulti] = React.useState([]);
  const [fund, setFund] = React.useState("");
  const [stage, setStage] = React.useState("");
  const [errorIndustry, setErrorIndustry] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const user = useSelector((state) => state?.auth);
  const project = useSelector((state) => state?.project);
  const projectdata = useSelector((state) => state?.project?.projectBasicData);
  const token = useSelector((state) => state?.auth?.token);
  const [searchTxt, setSearchTxt] = React.useState('');
  const debouncedSearchTxt = useDebounce(searchTxt, 300);


  useEffect(() => {
    async function fetchProjectAirData() {
        const raw = ""
        const company = await dispatch(projectActions.fetchAllProject(raw));
    }
    fetchProjectAirData();
}, [location.search, dispatch]);

  useEffect(() => {
    async function fetchTimelineData() {

    }
    fetchTimelineData();
  }, [uuid, user.token]);


  const updateTxt = (event) => {
    setSearchTxt(event.target.value);
  };
  // const updateTxt = async(event) => {

  //   if(event.target.value?.length === 0){
  //     setSearchTxt(event.target.value);

  //     const searchresult = await dispatch(projectActions.resetSearch());
  //   }else{
  //     const data ={
  //       searchTxt: event.target.value
  //     }
  //     setSearchTxt(event.target.value);
  //     const searchresult = await dispatch(projectActions.postSearch(data));
  //   }

  // };
  useEffect(() => {
    if (debouncedSearchTxt.length === 0) {
      dispatch(projectActions.resetSearch());
    } else {
      const data = {
        searchTxt: debouncedSearchTxt
      }
      dispatch(projectActions.postSearch(data));
    }
  }, [debouncedSearchTxt, dispatch]);

  const logout = async () => {
    const company = await dispatch(
      authActions.logoutSuccess()
    );
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)

  };

  const searchAll = async () => {
    const data = {
      searchTxt: searchTxt
    }
    if (searchTxt.length > 0) {

      const searchresult = await dispatch(projectActions.postSearch(data));
    } else {
      const searchresult = await dispatch(projectActions.resetSearch(data));
    }
  };

  const createProject = async () => {
    const authdata = await dispatch(projectActions.openBackdrop());
  };

  const handleLocationChange = (event, country) => {
    setLocationCOuntry(country);
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

  const handleFundChange = (event) => {
    // setIndustry(event.target.value);
    setErrorIndustry(false);
    const {
      target: { value },
    } = event;
    setFund(
      value
    );
  };

  const showResult = async() =>{
    const data = {
      location: locationCountry,
      industryMulti:industryMulti, 
      fund: fund,
      stage: stage   
  }
  const searchresult = await dispatch(projectActions.postSearch(data));
  const params = new URLSearchParams();
  if (locationCountry) params.append('location', locationCountry);
  if (industryMulti.length > 0) params.append('industry', industryMulti.join(','));
  if (fund) params.append('fund', fund);
  if (stage) params.append('stage', stage);
  
  // Navigate with params
  navigate({
    pathname: '/projectss',
    search: params.toString()
  });
  }


  const handleStageChange = (event) => {
    // setIndustry(event.target.value);
    setErrorIndustry(false);
    const {
      target: { value },
    } = event;
    setStage(
      value
    );
  };


  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "column",

        backgroundImage: `url(${search_landing})`, // Replace with actual background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 16px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={Refy} height="48px" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center", gap: 2 }}>
            {user?.loggedIn && location?.pathname != '/projects' && <>
              <Link href={'/project/' + uuid} sx={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    my: 1, color: !location.pathname.includes('documentation') ? '#008080' : '#47474F', display: 'block', textTransform: 'capitalize', textDecoration: "none",
                    fontSize: '18px'
                  }}
                >
                  Project Overview

                </Button>
              </Link>
              <Link href={'/project/documentation/' + uuid} sx={{ textDecoration: "none", }}>
                <Button


                  sx={{
                    my: 1, color: location.pathname.includes('documentation') ? '#008080' : '#47474F', display: 'block', textTransform: 'capitalize', textDecoration: "none",
                    fontSize: '18px',
                    boxShadow: project?.highlightMoreQ ? "0px 0px 15px 0px #008080" : "none", backgroundColor: project?.highlightMoreQ ? '#ffffff' : '#ffffff', opacity: project?.highlightMoreQ ? 1 : 1
                  }}

                >
                  Documentations
                </Button>
              </Link>
            </>
            }


          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: "center", gap: 2 }}>
            {user?.loggedIn && <>
              <Link href={'/project/' + uuid} sx={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    my: 2, color: !location.pathname.includes('documentation') ? '#008080' : '#47474F', display: 'block', textTransform: 'capitalize', textDecoration: "none",
                    fontSize: '18px'
                  }}
                >
                  Project
                </Button>
              </Link>
              <Link href={'/project/documentation/' + uuid} sx={{ textDecoration: "none", }}>
                <Button


                  sx={{
                    my: 2, color: location.pathname.includes('documentation') ? '#008080' : '#47474F', display: 'block', textTransform: 'capitalize', textDecoration: "none",
                    fontSize: '18px',
                    boxShadow: project?.highlightMoreQ ? "0px 0px 15px 0px #008080" : "none", backgroundColor: project?.highlightMoreQ ? '#ffffff' : '#ffffff', opacity: project?.highlightMoreQ ? 1 : 1
                  }}

                >
                  Documentations
                </Button>
              </Link>
            </>
            }


          </Box>


          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
            {user?.loggedIn && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => logout()}
                  startIcon={<img src={logoutImg} />}
                  sx={{ my: 1, textTransform: "none", fontWeight: "500", fontSize: "18px", height: "48px" }}
                >
                  Logout
                </Button>
              </>
            )}

          </Box>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          color: "#ffffff",
          textAlign: "center",
          padding: "60px 30px 60px 30px",
        }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2, fontWeight: 'bold', fontSize: "48px" }}>
            Find the best projects for your investments.
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Discover your investment opportunity for renewable energy
          </Typography>

          {/* Search Box */}
          <Paper
            sx={{
              p: '24px 16px 24px 16px',
              display: 'flex',
              flexDirection: "column",
              alignItems: 'flex-start',
              width: '100%',
              maxWidth: '80%',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, fontSize: "24px" }}>
              Find Developers
            </Typography>

            <Box sx={{
              p: '4px 4px 8px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              gap: "16px"
            }}>
              <Box sx={{ width: "20%" }}>
                <TextField
                  id="outlined-select-gender"
                  select
                  label={
                    !industryMulti || industryMulti?.length == 0
                      ? "Industry"
                      : ""
                  }
                  InputLabelProps={{

                    shrink: false,
                    sx: {
                      marginLeft: '30px', // Move label to the right of the icon
                      '&.MuiInputLabel-shrink': {
                        marginLeft: 0, // Reset margin when label shrinks
                      },
                    }
                  }}
                  SelectProps={{
                    multiple: true,
                    value: industryMulti,
                    onChange: handleIndustryChange,
                    renderValue: (selected) => {
                      if (selected.length === 0) {
                        return '';
                      }
                      if (selected.length === 1) {
                        return selected[0];
                      }
                      return `${selected[0]} + ${selected.length - 1}`;
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={20} color="#008080" />
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  variant="outlined"
                  size="small"
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
                  {optionsIndustry?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox
                        checked={industryMulti?.indexOf(option.value) > -1}
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
              <Box sx={{ width: "20%" }}>
                <Autocomplete
                  disablePortal
                  id="location-autocomplete"
                  options={countries}
                  value={locationCountry}
                  onChange={handleLocationChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{
                        shrink: false,
                        sx: {
                          marginLeft: '0px', // Move label to the right of the icon
                          '&.MuiInputLabel-shrink': {
                            marginLeft: 0, // Reset margin when label shrinks
                          },
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start" sx={{ marginLeft: '8px' }}>
                            <Earth size={20} color="#008080" />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Location"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '42px',
                          paddingLeft: '0px',
                          '& fieldset': {
                            borderColor: '#DAE2ED',
                          },
                          '&:hover fieldset': {
                            borderColor: '#B0B8C4',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3399FF',
                          },
                        },
                        '& .MuiAutocomplete-input': {
                          padding: '0px 9px !important',
                        },
                      }}
                    />
                  )}
                  sx={{
                    width: "100%",
                    '& .MuiAutocomplete-inputRoot': {
                      paddingLeft: '4px !important', // Make room for the icon
                      marginTop:'0px !important',
                      paddingTop: '2px !important',
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: "20%" }}>
                <TextField
                  id="outlined-select-gender"
                  select
                  label={
                    !stage
                      ? "Stage"
                      : ""
                  }
                  InputLabelProps={{

                    shrink: false,
                    sx: {
                      marginLeft: '30px', // Move label to the right of the icon
                      '&.MuiInputLabel-shrink': {
                        marginLeft: 0, // Reset margin when label shrinks
                      },
                    }
                  }}
                  SelectProps={{
                    multiple: false,
                    value: stage,
                    onChange: handleStageChange,
                    renderValue: (selected) => {
                      if (selected.length === 0) {
                        return '';
                      }
                      if (selected.length === 1) {
                        return selected;
                      }
                      return `${selected}`;
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <File size={20} color="#008080" />
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={stage}
                  onChange={handleStageChange}
                  sx={{
                    width: "100%",
                    color: "#606060",
                    marginTop: "8px",

                    "& .MuiInputLabel-root": {
                      color: "#9BA5B7 !important",
                    },

                  }}
                >
                  {optionsProjectStage?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox
                        checked={option.value === stage}
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
              <Box sx={{ width: "20%" }}>
                <TextField
                  id="outlined-select-gender"
                  select
                  label={
                    !fund
                      ? "Fund"
                      : ""
                  }
                  InputLabelProps={{

                    shrink: false,
                    sx: {
                      marginLeft: '30px', // Move label to the right of the icon
                      '&.MuiInputLabel-shrink': {
                        marginLeft: 0, // Reset margin when label shrinks
                      },
                    }
                  }}
                  SelectProps={{
                    multiple: false,
                    value: fund,
                    onChange: handleFundChange,
                    renderValue: (selected) => {
                      if (selected.length === 0) {
                        return '';
                      }
                      if (selected.length === 1) {
                        return selected;
                      }
                      return `${selected}`;
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <DollarSign size={20} color="#008080" />
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={fund}
                  onChange={handleFundChange}
                  sx={{
                    width: "100%",
                    color: "#606060",
                    marginTop: "8px",

                    "& .MuiInputLabel-root": {
                      color: "#9BA5B7 !important",
                    },

                  }}
                >
                  {optionsFundSize?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox
                        checked={option.value === fund}
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
              <Button
                size="small"
                sx={{
                  p: '6px',
                  backgroundColor: '#008080',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#006666',
                  }
                }}
                onClick={() => showResult()}
              >
                Show results
              </Button>
            </Box>
          </Paper>
        </Box>
        {/* <Box sx={{
          maxwidth: "1400px", width: "100%", margin: "auto",
          backgroundColor: "#fff", border: "1px solid #E9EBF4", margin: "24px 0px",
          display: "flex", justifyContent: "center", alignItems: "center",
          flexDirection: "column",

        }}>
          <Box sx={{ display: "flex", flex: 1, width: "100%", padding: "24px", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", padding: "24px" }}>
            <Box sx={{ padding: "0px 24px" }}>
              <Typography sx={{ color: "#000000", fontFamily: "Satoshi Regular", fontSize: "24px", fontWeight: "700" }}>
                All Projects
              </Typography>
            </Box>
            <Box sx={{ padding: "0px 16px", display: "flex", flexDirection: "row", gap: 3, alignItems: "center" }}>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, border: "1px solid #DAE2ED",
                  color: "#1C2025",
                  boxShadow: " 0 1px 2px 0 rgb(0 0 0 / 0.05)"
                }}
              >

                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search google maps' }}
                  value={searchTxt}
                  onChange={updateTxt}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon onClick={searchAll} />
                </IconButton>

              </Paper>
              <Sort />
              <Filter />

            </Box>
            <Box>

            </Box>
          </Box>


        </Box> */}
      </Box>

    </>
  );
}
export default SearchProjectHeaderLanding;



