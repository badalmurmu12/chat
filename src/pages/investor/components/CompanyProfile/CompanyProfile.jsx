import React, { useEffect } from 'react';
import { Typography, Box, Button, Avatar, Divider } from "@mui/material";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './CompanyProfile.css';
import * as projectActions from "../../../../store/project";
import james from "../../../../assets/james.png";



const CompanyProfile = (props) => {
  const { uuid, typeOfQ } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector((state) => state?.project);
  const projectGenAIBasicData = useSelector((state) => state?.project?.projectGenAIBasicData);

  useEffect(
    () => {
      async function fetchInterestedk(uuid) {
        const task = await dispatch(projectActions?.amiInterested(uuid))
      }
      fetchInterestedk(uuid);
    }, [uuid]
  )

  const handleMenuItemClick = (route) => {
    if (location?.pathname?.includes('/investor/project/')) {
      navigate(`/investor/project/${uuid}/${route}`);
    }
    else {
      navigate(`/${uuid}/${route}`);
    }
  };
  const iamInterested = async () => {
    const raw = uuid;
    const interested = await dispatch(projectActions.iamInterested(raw));
  }

  const isSelected = (route) => {
    if (!typeOfQ) {
      if (route === 'projectInfo') {
        return true
      } else {
        return false
      }
    }
    else
      return (typeOfQ === route)
  }

  return (
    <Box sx={{
      display: "flex", width: "calc(100% - 4px)", flexDirection: "column", opacity: project?.highlightIam ? 1 : 1,
    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          width: "100%",

        }}
      >

        <Box sx={{ display: "flex", gap: 1 }}>
          <Box pt={0.5} sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <MenuList sx={{ width: "100%", }}>
              {[
                { route: 'projectInfo', label: 'Project Overview' },
                { route: 'developerInfo', label: 'Developer Profile' },
                { route: 'esgImpact', label: 'ESG Impact' },
                { route: 'financialProjections', label: 'Financial Projections' },
                { route: 'projectDocuments', label: 'Documentation Center' }
              ].map((item) => (
                <MenuItem
                  key={item.route}
                  onClick={() => handleMenuItemClick(item.route)}
                  sx={{
                    fontFamily: "Manrope-medium",
                    marginLeft: "0px",
                    marginTop: "8px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    paddingLeft: "8px",
                    backgroundColor: isSelected(item.route) ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    border: isSelected(item.route) ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    }
                  }}
                >
                  <Typography variant="inherit" sx={{ color: "#fff", fontFamily: "Manrope-medium", fontSize: "14px" }}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>

            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "8px 16px",
                flex: 1,
              }}
            >
              <Typography
                sx={{ color: "#12190F", fontWeight: "500", fontSize: "14px" }}
              >
                Capital required
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{ color: "#12190F", fontWeight: "700", fontSize: "12px", }}
                >
                  {projectGenAIBasicData?.capitalRequired ? projectGenAIBasicData?.capitalRequired : props?.project?.projectData?.data?.ProjectQuestion?.q1?.toLocaleString()}
                </Typography>

              </Box>

            </Box> */}
          </Box>

          {/* <Box p={1}>
            <Box
              sx={{
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >

                <Box
                  sx={{
                    display: "flex",
                    pl: 2,
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "14px" }}>{projectGenAIBasicData?.ownerName ? projectGenAIBasicData?.ownerName : props?.project?.organisation?.owner}</Typography>
                  <Typography sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "12px" }}>{projectGenAIBasicData?.ownerDesignation ? projectGenAIBasicData?.ownerDesignation : props?.project?.organisation?.ownerDesignation}</Typography>
                </Box>
              </Box>
            </Box>
          </Box> */}
        </Box>

      </Box>



    </Box>
  );
};

export default CompanyProfile;



// <Box>
// <Typography>
//   Alp Technologies Ltd, established in 2017 in London, England,
//   develops affordable smart renewable energy solutions for
//   emerging markets. Specializes in the Mega-BRIC Battery System, a
//   maintainable and cost-effective clean energy solution. View More
// </Typography>
// </Box>