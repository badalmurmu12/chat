import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import next from "../../assets/next.svg";
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    width: 280,
    backgroundColor:"#E6F2F2",
    padding:"8px", 
    borderRadius:"8px",
    boxShadow:"none",
    border:"1px solid #B0D8D8", 
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
        boxShadow: theme.shadows[4],
    },
}));

const DetailRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
}));

const ProjectCard = ({
    title,
    projectType,
    location,
    budget,
    imageUrl = "/api/placeholder/400/200"
}) => {
    return (
        <StyledCard>
            <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{padding:"16px 0px 0px 0px", paddingBottom:"0px !important"}}>
                <Typography variant="h6" gutterBottom sx={{color:"#000000", fontSize:"12px", fontFamily:"Manrope-SemiBold" }}>
                    {title}
                </Typography>
                <Divider sx={{backgroundColor:"#B0D8D8"}} /> 
                <DetailRow sx={{paddingTop:"8px"}}>
                    <Typography variant="body2" color="text.secondary" sx={{color:"#848484", fontSize:"11px", fontFamily:"Manrope-Regular"}}>
                        Project type
                    </Typography>
                    <Typography variant="body2" fontWeight="medium" sx={{color:"#848484", fontSize:"11px", fontFamily:"Manrope-Regular"}}>
                        {projectType}
                    </Typography>
                </DetailRow>

                <DetailRow>
                    <Typography variant="body2" color="text.secondary" sx={{color:"#848484", fontSize:"11px", fontFamily:"Manrope-Regular"}}>
                        Location
                    </Typography>
                    <Typography variant="body2" fontWeight="medium" sx={{color:"#848484", fontSize:"11px", fontFamily:"Manrope-Regular"}}>
                        {location}
                    </Typography>
                </DetailRow>
                <Divider sx={{backgroundColor:"#B0D8D8"}} />
                <DetailRow sx={{paddingTop:"8px"}}>

                    <Typography variant="body2" fontWeight="medium" sx={{color:"#454545", fontSize:"12px", fontFamily:"Manrope-Regular"}}>
                        {budget}
                    </Typography>

                    <Box display="flex" justifyContent="flex-end" mt={1}>
                        <img src={next} height={24} />
                    </Box>
                </DetailRow>

            </CardContent>
        </StyledCard>
    );
};

export default ProjectCard;