import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import  { useParams } from "react-router-dom";
import Header from "./components/Header"; 
import TermAndConditions from "./components/TermAndConditions";
import Questions from "./components/Questions";
import QuestionsProject from "./components/QuestionsProject";
import QuestionsFinance from "./components/QuestionsFinance";

export default function AdditionalDetails() {
    let { type } = useParams();
  return (
    <>
        <Header />
        
        { type === 'termnconditions' && <TermAndConditions /> }
        { type === 'company' && <Questions />}
        { type === 'project' && <QuestionsProject />}
        { type === 'finance' && <QuestionsFinance />}
    </>
  );
}
