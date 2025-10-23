import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress, Box, Typography, Chip , IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import trendingdown from '../../../../assets/trending-down.svg';
import average from '../../../../assets/average.svg';
import high from '../../../../assets/high.svg';
import sun from '../../../../assets/sun.svg';
import battery from '../../../../assets/battery.svg';
import bi_truck from '../../../../assets/bi_truck.svg';
import green from '../../../../assets/green.svg';
import leaf from '../../../../assets/leaf.svg';
import water from '../../../../assets/water.svg';
import waste from '../../../../assets/waste.svg';
import bookmark from '../../../../assets/bookmark.svg';
import arrowRight from '../../../../assets/arrow-right.svg';



import * as projectActions from "../../../../store/project";

const optionsIndustry = [
  { name: "Renewable Energy", value: "Renewable Energy" , icon: 'sun'},
  { name: "Energy Efficiency", value: "Energy Efficiency", icon: 'green' },
  { name: "Sustainable Transportation", value: "Sustainable Transportation", icon: 'bi_truck' },
  { name: "Waste Management", value: "Waste Management", icon: 'waste' },
  { name: "Water Conservation", value: "Water Conservation" , icon: 'water'},
  { name: "Biomass Biofuel", value: "Biomass Biofuel" , icon: 'leaf'},
  { name: "Battery", value: "Battery" , icon: 'battery'},
  { name: "Others", value: "Others" , icon: 'sun'},
];

const ColoredLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 5,
  borderRadius: 5,
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor: value >= 50 ? '#34C759' : value >= 25 ? '#FFCC00' : '#F55B64',
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <ColoredLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


const RiskChip = ({ risk }) => {
  let icon, label, backgroundColor, color;

  switch (risk.toLowerCase()) {
    case 'low':
      icon = <img src={trendingdown} height="20px" alt="Low Risk" />;
      label = "Low";
      backgroundColor = "#E1FFE9";
      color = "#34C759";
      break;
    case 'high':
      icon = <img src={high} height="20px" alt="High Risk" />;
      label = "High";
      backgroundColor = "#FFE1E1";
      color = "#FF3B30";
      break;
    case 'average':
    default:
      icon = <img src={average} height="20px" alt="Average Risk" />;
      label = "Average";
      backgroundColor = "#FFF9E1";
      color = "#FFCC00";
      break;
  }

  return (
    <Chip
      sx={{ backgroundColor, color }}
      icon={icon}
      label={label}
    />
  );
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('ALP Technologies', 'Feb 24th, 2024, 08.53 AM', 'Development', 'energy', 'Term-sheet created', 'action'),

];

export default function AllProjects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state?.project?.projects);
  const navigateToProject = (uuid) => {
    navigate('/project/' + uuid)
  }

  useEffect(() => {

    async function fetchData() {

   

    }

    fetchData();

    

  }, []);

 


  const getIndustryIcon = (iconName) => {
    switch (iconName) {
      case 'sun':
        return sun;
      case 'green':
        return green;
      case 'bi_truck':
        return bi_truck;
      case 'waste':
        return waste;
      case 'water':
        return water;
      case 'leaf':
        return leaf;
      case 'battery':
        return battery;
      default:
        return sun;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">

        <TableHead>
          <TableRow sx={{ backgroundColor: "#ffffff" }}>
            <TableCell sx={{color:"#797979"}}>Sr No</TableCell>
            <TableCell sx={{color:"#797979"}}>Industry</TableCell>
            <TableCell align="center" sx={{color:"#797979"}}>Location</TableCell>
            <TableCell align="center" sx={{color:"#797979"}}>Funds required</TableCell>
            <TableCell align="center" sx={{color:"#797979"}}>Project Readiness</TableCell>
            <TableCell align="center" sx={{color:"#797979"}}>Risk</TableCell>
            <TableCell align="right" sx={{color:"#797979"}}>Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {projects?.map((row, index) => {
            let projectName = ""
            let loc = ""
            let fund = ""
            let industry = ""
            let risk = 'average';
 
            if (typeof (row?.projectData) === 'string') {
              const projectdata = JSON.parse(row?.projectData)
              projectName = projectdata?.data?.BasicData?.ProjectName;
              industry = projectdata?.data?.BasicData?.industry;
              loc = projectdata?.data?.BasicData?.ProjectLocation;
              fund = projectdata?.data?.ProjectQuestion?.q1;
              risk = projectdata?.data?.Risk || 'average';

            }
            const matchedIndustry = optionsIndustry.find(option => option.value === industry) || optionsIndustry[optionsIndustry.length - 1];
            return (
              <TableRow key={row?.id} onClick={() => navigateToProject(row?.uuid)} sx={{ cursor: "pointer" }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                   
                <img src={getIndustryIcon(matchedIndustry.icon)} alt={matchedIndustry.name} height="24" />
                    <Typography>{matchedIndustry.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{loc}</TableCell>
                <TableCell align="center">{fund}</TableCell>
                <TableCell align="center">
                  <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={80} />
                  </Box>
                </TableCell>
                <TableCell align="center">
                <RiskChip risk={risk} />
                </TableCell>
                <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={(e) => {
                      e.stopPropagation();
                      // Add your bookmark functionality here
                      console.log('Bookmark clicked for project:', row?.id);
                    }}>
                      <img src={bookmark} alt="Bookmark" height="20px" />
                    </IconButton>
                    <IconButton  >
                      <img src={arrowRight} alt="View Details" height="20px" />
                    </IconButton>
                  </Box>
                </TableCell>


              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}