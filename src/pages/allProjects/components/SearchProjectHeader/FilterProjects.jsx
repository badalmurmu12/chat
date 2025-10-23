import React, { useState, useEffect, useLayoutEffect } from "react";
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
import close from "../../../../assets/x.svg";
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
import Chip from '@mui/material/Chip';


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


const CustomChip = ({ label, onDelete }) => (
    <Chip
        label={label}
        onDelete={onDelete}
        color="primary"
        variant="outlined"
        sx={{
            color: '#007AFF',
            borderColor: '#007AFF',
            '& .MuiChip-deleteIcon': {
                color: '#007AFF',
            },
        }}
        deleteIcon={<img src={close} alt="close" style={{ width: '16px', height: '16px' }} />}
    />
);

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
    { name: "Renewable Energy", value: "Renewable Energy", icon: 'sun' },
    { name: "Energy Efficiency", value: "Energy Efficiency", icon: 'green' },
    { name: "Sustainable Transportation", value: "Sustainable Transportation", icon: 'bi_truck' },
    { name: "Waste Management", value: "Waste Management", icon: 'waste' },
    { name: "Water Conservation", value: "Water Conservation", icon: 'water' },
    { name: "Biomass Biofuel", value: "Biomass Biofuel", icon: 'leaf' },
    { name: "Battery", value: "Battery", icon: 'battery' },
    { name: "Others", value: "Others", icon: 'sun' },
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
const optionsProjectRisk = [
    { name: "Low", value: "low" },
    { name: "Medium", value: "medium" },
    { name: "High", value: "high" },

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


function FilterProjects() {
    const { uuid } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = React.useState(0);
    const [parsedData, setParsedData] = useState(null);
    const [industry, setIndustry] = useState("");
    const [locationCountry, setLocationCountry] = useState("");
    const [industryMulti, setIndustryMulti] = React.useState([]);
    const [fund, setFund] = React.useState("");
    const [stage, setStage] = React.useState("");
    const [risk, setRisk] = React.useState("");
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

    useLayoutEffect(() => {
        async function fetchProjectAirData() {
            const raw = ""
            const company = await dispatch(projectActions.fetchAllProject(raw));
            const params = new URLSearchParams(location.search);
          
            // Set states based on URL parameters
            setLocationCountry(params.get('location') || "");
            setIndustryMulti(params.get('industry') ? params.get('industry').split(',') : []);
            setFund(params.get('fund') || "");
            setStage(params.get('stage') || "");
            
            // Trigger search with parsed parameters
            const filters = {
              location: params.get('location') || "",
              industryMulti: params.get('industry') ? params.get('industry').split(',') : [],
              fund: params.get('fund') || "",
              stage: params.get('stage') || "",
            };
            await dispatch(projectActions.postSearch(filters));
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
    // useEffect(() => {
    //     if (debouncedSearchTxt.length === 0) {
    //         dispatch(projectActions.resetSearch());
    //     } else {
    //         const data = {
    //             searchTxt: debouncedSearchTxt
    //         }
    //         dispatch(projectActions.postSearch(data));
    //     }
    // }, [debouncedSearchTxt, dispatch]);

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

    const handleLocationChange = async(event, country) => {
        setLocationCountry(country);
        const data = {
            location: country,
            industryMulti:industryMulti, 
            fund: fund,
            stage: stage,
            risk: risk    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };

    const handleIndustryChange = async(event) => {
        // setIndustry(event.target.value);
        setErrorIndustry(false);
        const {
            target: { value },
        } = event;
        setIndustryMulti(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );

        const data = {
            location: locationCountry,
            industryMulti:industryMulti, 
            fund: fund,
            stage: stage,
            risk: risk    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };

    const handleFundChange = async(event) => {
        // setIndustry(event.target.value);
        setErrorIndustry(false);
        const {
            target: { value },
        } = event;
        setFund(
            value
        );
        const data = {
            location: locationCountry,
            industryMulti:industryMulti, 
            fund: value,
            stage: stage,
            risk: risk    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };


    const handleRiskChange = async(event) => {

        const {
            target: { value },
        } = event;
        setRisk(
            value
        );
        const data = {
            location: locationCountry,
            industryMulti:industryMulti, 
            fund: fund,
            stage: stage,
            risk: value    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };



    const handleStageChange = async(event) => {
        // setIndustry(event.target.value);
        setErrorIndustry(false);
        const {
            target: { value },
        } = event;
        setStage(
            value
        );
        const data = {
            location: locationCountry,
            industryMulti:industryMulti, 
            fund: fund,
            stage: value,
            risk: risk    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };

    const handleDeleteIndustry = (industryToDelete) => () => {
        setIndustryMulti((current) => current.filter((industry) => industry !== industryToDelete));
    };
    const handleDeleteLocation = async() => {
        setLocationCountry(null);
        const data = {
            location: null,
            industryMulti:industryMulti, 
            fund: fund,
            stage: stage,
            risk: risk    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };

    const handleDeleteStage = async() => {
        setStage("");
        const data = {
            location: locationCountry,
            industryMulti:industryMulti, 
            fund: fund,
            stage:  "",
            risk: risk    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };

    const handleDeleteFund = async() => {
        setFund("");
        const data = {
            location: locationCountry,
            industryMulti:industryMulti, 
            fund:  "",
            stage: stage,
            risk: risk    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };

    const handleDeleteRisk = async() => {
        setRisk("");
        const data = {
            location: locationCountry,
            industryMulti:industryMulti, 
            fund: fund,
            stage: stage,
            risk:  ""    
        }
        const searchresult = await dispatch(projectActions.postSearch(data));
    };

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 16px",
                    }}
                >

                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1,
                    color: "#ffffff",
                    textAlign: "center",
                    padding: "16px 16px",
                }}>


                    {/* Search Box */}
                    <Paper
                        sx={{
                            p: '24px 16px 24px 16px',
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: 'flex-start',
                            width: '100%',
                            maxWidth: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            borderRadius: '8px',
                            border: '1px solid #E9EBF4',
                            boxShadow: 'none'
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, fontSize: "24px" }}>
                            All Projects
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
                                            ? "Project Industry"
                                            : ""
                                    }
                                    InputLabelProps={{

                                        shrink: false,
                                        sx: {
                                            marginLeft: '4px', // Move label to the right of the icon
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

                                            }}
                                            placeholder="Location"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: '42px',
                                                    paddingLeft: '0px',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(0, 0, 0, 0.5)',
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
                                            marginTop: '0px !important',
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
                                            marginLeft: '4px', // Move label to the right of the icon
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
                                            ? "Fund Size"
                                            : ""
                                    }
                                    InputLabelProps={{

                                        shrink: false,
                                        sx: {
                                            marginLeft: '4px', // Move label to the right of the icon
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


                            <Box sx={{ width: "20%" }}>
                                <TextField
                                    id="outlined-select-gender"
                                    select
                                    label={
                                        !risk
                                            ? "Risk"
                                            : ""
                                    }
                                    InputLabelProps={{

                                        shrink: false,
                                        sx: {
                                            marginLeft: '4px', // Move label to the right of the icon
                                            '&.MuiInputLabel-shrink': {
                                                marginLeft: 0, // Reset margin when label shrinks
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        multiple: false,
                                        value: risk,
                                        onChange: handleRiskChange,
                                        renderValue: (selected) => {
                                            if (selected.length === 0) {
                                                return '';
                                            }
                                            if (selected.length === 1) {
                                                return selected;
                                            }
                                            return `${selected}`;
                                        },

                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    value={risk}
                                    onChange={handleRiskChange}
                                    sx={{
                                        width: "100%",
                                        color: "#606060",
                                        marginTop: "8px",

                                        "& .MuiInputLabel-root": {
                                            color: "#9BA5B7 !important",
                                        },

                                    }}
                                >
                                    {optionsProjectRisk?.map((option) => (
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
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                            {industryMulti.map((industry) => (
                                <CustomChip
                                    key={industry}
                                    label={industry}
                                    onDelete={handleDeleteIndustry(industry)}
                                />
                            ))}
                            {locationCountry && (
                                <CustomChip
                                    label={locationCountry}
                                    onDelete={handleDeleteLocation}
                                />
                            )}
                            {fund && (
                                <CustomChip
                                    label={fund}
                                    onDelete={handleDeleteFund}
                                />
                            )}
                            {stage && (
                                <CustomChip
                                    label={stage}
                                    onDelete={handleDeleteStage}
                                />
                            )}
                            {risk && (
                                <CustomChip
                                    label={risk}
                                    onDelete={handleDeleteRisk}
                                />
                            )}
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
export default FilterProjects;



