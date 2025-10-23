import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Button, Avatar, CircularProgress, Paper } from "@mui/material";
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
import logoutImg from "../../../../assets/logout.svg";
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import Sort from '../Sort/Sort';
import Filter from "../Filter/Filter";
import useDebounce from './useDebounce';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

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


const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
    `,
);

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


function SearchProjectHeader() {
  const { uuid } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = React.useState(0);
  const [parsedData, setParsedData] = useState(null);
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

    }
    fetchProjectAirData();
  }, [uuid, user.token]);

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
      const data ={
        searchTxt: debouncedSearchTxt
      }
      dispatch(projectActions.postSearch(data));
    }
  }, [debouncedSearchTxt, dispatch]);

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


  return (
    <>

      <Box sx={{
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


      </Box>

    </>
  );
}
export default SearchProjectHeader;



