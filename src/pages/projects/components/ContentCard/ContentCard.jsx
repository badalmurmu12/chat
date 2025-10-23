import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Typography, Box, Button } from "@mui/material";
import { Document, Page, pdfjs } from 'react-pdf';
import documents from '../../../../assets/documents.svg';
import mail from '../../../../assets/maile.svg';
import calendar from '../../../../assets/calendar.svg';
import grabiella from '../../../../assets/grabieela.png';
import Chevronright from '../../../../assets/chevron-right.svg';
import Alp_Tech_Intro from '../../../../assets/Alp_Tech_Intro.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ContentCard = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  let docment =
    'https://docs.google.com/viewer?url=' +
    'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Fce37b490-9239-4c15-9c62-1a78ddf1c822%2FAlp%20Tech_Intro%20(1).pdf?alt=media&token=df37f7f9-83ec-4548-812b-9ed5e69dc71c' +
    '&embedded=true';
  // const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Fce37b490-9239-4c15-9c62-1a78ddf1c822%2FAlp%20Tech_Intro%20(1).pdf?alt=media&token=df37f7f9-83ec-4548-812b-9ed5e69dc71c';

  const firebaseStorageUrl = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Fce37b490-9239-4c15-9c62-1a78ddf1c822%2FAlp%20Tech_Intro%20(1).pdf?alt=media&token=df37f7f9-83ec-4548-812b-9ed5e69dc71c';
  const xlxUrl = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FREC%20Project%20FInancials_09052024%20(1).xlsx?alt=media&token=56b042b1-4ea1-4374-a7e0-b8f0e065b1d2';
  
  const ppt = 'https://firebasestorage.googleapis.com/v0/b/rosy-ratio-419722.appspot.com/o/project%2Fbadal-refycap-com%2Ftest-project%2FNon%20HF%20Recycle%20%20Project%20update%2007%20Apr%20%2024.pptx?alt=media&token=ac72d5a9-1828-4db7-a45b-623334261139';
  // Encode the Firebase Storage URL
  const encodedUrl = encodeURIComponent(ppt);

  // Create the Google Docs viewer URL
  const googleDocViewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;



  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const storage = getStorage();

        const pdfRef = ref(storage, 'project/badal-refycap-com/ce37b490-9239-4c15-9c62-1a78ddf1c822/Alp_Tech_Intro.pdf');
        const url = await getDownloadURL(pdfRef);
        setPdfUrl(url);

      } catch (error) {
        console.error('Error retrieving download URL:', error);
      }
    };

    fetchPdfUrl();
  }, []);

  return (
    <Card sx={{ marginTop: "16px", width: "100%", padding: "16px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <iframe src={googleDocViewerUrl} width="100%" height="auto" style={{ minHeight: '400px' }} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
       
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

      </CardActions>

    </Card>
  );
};

export default ContentCard;



