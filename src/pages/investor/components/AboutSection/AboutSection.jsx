import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Divider } from "@mui/material";

const AboutSection = ({ summary }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const wordLimit = 25;

  useEffect(() => {
    if (summary) {
      const words = summary.split(' ');
      if (words.length > wordLimit && !isExpanded) {
        setDisplayText(words.slice(0, wordLimit).join(' ') + '...');
      } else {
        setDisplayText(summary);
      }
    }
  }, [summary, isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const wordCount = summary ? summary.split(' ').length : 0;

  return (
    <>
      <Typography sx={{ color: "#FFFFFF",   fontSize: "14px", opacity: "0.5",fontWeight: "400",  fontFamily:"Manrope-Medium"  }}>
        About
      </Typography>
      <Typography sx={{ color: "#FFFFFF", textAlign: "justified", fontFamily:"Manrope-Medium",fontSize:"14px",  }}>
        {displayText}
      </Typography>
      {wordCount > wordLimit && (
        <Button 
          onClick={toggleExpand} 
          sx={{ 
            color: "#FFFFFF", 
            textTransform: 'none', 
            padding: 0,
            fontFamily:"Manrope-SemiBold",
            fontSize:"15px",
            alignSelf: 'flex-start',
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'none',
            }
          }}
        >
          {isExpanded ? "See less" : "See more"}
        </Button>
      )}
      <Divider sx={{ backgroundColor: "#ffffff", opacity: "0.2", marginTop: 2 }} />
    </>
  );
};

export default AboutSection;