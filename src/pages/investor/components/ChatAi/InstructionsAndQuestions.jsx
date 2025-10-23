import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PreMadeQuestions = ({ typeOfQ, questions, onQuestionClick, limit }) => {
    const displayedQuestions = limit ? questions.slice(0, limit) : questions;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {displayedQuestions.map((question, index) => (
                <Box
                    key={index}
                    sx={{
                        width: "fit-content",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #008080",
                        cursor: "pointer",
                        backgroundColor: '#ffffff',
                        '&:hover': {
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #008080"
                        }
                    }}
                    onClick={() => onQuestionClick(question)}
                >
                    <Typography sx={{ fontSize: "14px", fontFamily: "Manrope-Medium", fontWeight: "500",letterSpacing:"0.8px", wordSpacing:"1px", color: "#008080" }}>
                        {question}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

const InstructionsAndQuestions = ({ typeOfQ, instructions, instructionsType, onQuestionClick }) => {
    const [showAllQuestions, setShowAllQuestions] = useState(false);
    const questions = {
        developerInfo: [
            "What's the team composition and their roles?",
            "What's experience and track record of this developer?",
            "What sort of due diligence has been done on the developer?"
        ],
        projectInfo: [
            "Tell me more about the project details",
            "Tell me the projected timelines?",
            "What's the current status of the project?",
            "Who are the relevant parties and their roles?",
            "What are the key risks to the success of the project?"
        ],
        esgImpact: [
            "What is estimate carbon reduction impact with this project?",
            "Estimate the local community impact with this project?",
            "Has studies been conducted to ensure regulatory compliance?"
        ],
        financialProjections: [
            "What's the projected IRR returns for both base case and upside case?",
            "Can you show me annual cashflow projections over time?",
            "Can you show me the breakdown of operating costs?",
            "What's your projected EBITDA overtime against debt service?",
            "Please show me a graph of the cumulative cashflows over time.",
            "Can you provide sensitive analysis on the returns if Feed-in-Tariffs is varied by 20% on both directions?"
        ],
        projectDocuments: [
            "What are the key documentations that are required for a solar farm?",
            "Has the relevant permit approval been obtained?",
            "Can you show me what's been submitted thus far?",
            "Can you share where we stand on the land acquisition?",
            "Has the Power Purchase Agreement (PPA) be finalised?",
            "Can you see a copy of the draft or final agreement?"
        ]
    };

    return (
        <>
            <Box sx={{
                position: 'relative',
                backgroundColor: '#F2F2F2',
                padding: '16px',
                borderRadius: '4px',
                zIndex: 1000,
                maxWidth: '800px',
                marginTop: '10px',
                width: "100%"
            }}>
                <Typography sx={{ fontSize: '14px', color: '#6D6D6D', letterSpacing:"0.9px", wordSpacing:"1px", }}>
                    {instructions && instructions[typeOfQ]  ? instructions[typeOfQ] : '' }
                </Typography>
                <List dense sx={{ padding: 0, listStyleType: 'disc', pl: 4 }}>
                    {instructionsType && instructionsType[typeOfQ]?.map((item, index) => (
                        <ListItem key={index} sx={{
                            display: 'list-item',
                            padding: '0px 0px',
                            '&::marker': {
                                fontSize: '14px',
                                color: '#666'
                            }
                        }}>
                            <ListItemText
                                primary={item}
                                primaryTypographyProps={{
                                    fontSize: '14px',
                                    color: '#6D6D6D',
                                    letterSpacing:"0.9px", wordSpacing:"1px",
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                backgroundColor: "#ffffff",
                padding: "24px 0px",
                borderRadius: "8px",
                margin: "16px 8px 0px 8px",
                zIndex: 1000
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, cursor: "pointer" }}>
                    <Typography sx={{ fontFamily: "Manrope-Semibold", fontSize: "15px", }}>
                        {"You can also search for"}
                    </Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <PreMadeQuestions 
                        typeOfQ={typeOfQ} 
                        questions={questions[typeOfQ] || []} 
                        onQuestionClick={onQuestionClick} 
                        limit={showAllQuestions ? undefined : 2} 
                    />
                    {!showAllQuestions && questions[typeOfQ]?.length > 2 && (
                        <Button 
                            onClick={() => setShowAllQuestions(true)}
                            variant="outlined" endIcon={<ExpandMoreIcon />}
                            sx={{ 
                                mt: 2, 
                                color: '#008080', 
                                textTransform: 'none',
                                fontFamily: 'Manrope-Semibold',
                                fontSize: '14px',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    textDecoration: 'underline',
                                }
                            }}
                        >
                            See More
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default InstructionsAndQuestions;