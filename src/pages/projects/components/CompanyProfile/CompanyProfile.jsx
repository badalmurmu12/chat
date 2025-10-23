import React, {useEffect} from 'react';
import { Typography, Box, Button, Avatar } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CompanyProfile.css';
import * as projectActions from "../../../../store/project";
import james from "../../../../assets/james.png";



const CompanyProfile = (props) => {  
  const {uuid} = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state?.project);
  const projectGenAIBasicData = useSelector((state) => state?.project?.projectGenAIBasicData);

  useEffect(
    () =>{
      async function fetchInterestedk(uuid){
        const task  = await dispatch(projectActions?.amiInterested(uuid))
      }
      fetchInterestedk(uuid);
    }, [uuid]
  )

  const iamInterested = async() => {
    const raw = uuid;
    const interested = await dispatch(projectActions.iamInterested(raw));        
  }

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column",   backgroundColor:project?.highlightIam ? '#fff' : '#fff', opacity: project?.highlightIam ? 1 : 1,
     borderRadius: "8px", boxShadow: "0px 0px 4px 0px #E5E5E5" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          width: "100%",
        }}
      >

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "16px 8px",
          }}
        >
          <Box p={1} pb={1}>
            <Box sx={{ width: "66px", height: "66px", borderRadius: "8px", backgroundColor: "#F3F4F9" , display:"flex", justifyContent:"center", alignItems:"center"}}>
              <img src={props?.project?.organisation?.logo} width="80%"/>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              pl: 1,
              pt: 0.6,
              flexDirection: "column",
              justifyContent: "center",
              gap: 0.5
            }}
          >
            <Typography sx={{ color: "#12190F", fontSize: "18px", lineHeight: "27px", fontWeight: "700" }}>{ projectGenAIBasicData?.companyName ? projectGenAIBasicData?.companyName : props?.project?.organisation?.name}</Typography>
            <Typography sx={{ color: "#ABABAB", fontSize: "14px", lineHeight: "16px", fontWeight: "400" }}>
              {props?.project?.organisation?.tagline}
            </Typography>
          </Box>

        </Box>
        <Box pt={0} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Box
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
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px", }}
              >
                { projectGenAIBasicData?.capitalRequired ? projectGenAIBasicData?.capitalRequired : props?.project?.projectData?.data?.ProjectQuestion?.q1?.toLocaleString()}
              </Typography>
          
            </Box>

          </Box>
        </Box>

        <Box p={1}>
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #D9D9D9",
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
              <Avatar src={props?.project?.organisation?.ownerPhoto} />
              <Box
                sx={{
                  display: "flex",
                  pl: 2,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "14px" }}>{ projectGenAIBasicData?.ownerName ? projectGenAIBasicData?.ownerName : props?.project?.organisation?.owner}</Typography>
                <Typography sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "12px" }}>{ projectGenAIBasicData?.ownerDesignation ? projectGenAIBasicData?.ownerDesignation : props?.project?.organisation?.ownerDesignation}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>


        <Box sx={{ padding: "8px 8px 16px 8px", display: "flex", alignItems: "center", justifyContent: "center",borderRadius:"8px",boxShadow: project?.highlightIam ? "0px 0px 15px 0px #008080": "none", backgroundColor: project?.highlightIam ? '#ffffff' : '#ffffff', opacity: project?.highlightIam ? 1 : 1 }}> <Button sx={{ width: "calc(100%)", height: "48px", color: "#ffffff!important" }} variant="contained" onClick={iamInterested} disabled={project?.iamInterested}> I am Interested</Button>
        </Box>
      </Box>


      <Box>
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