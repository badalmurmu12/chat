import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Boxes, Send } from 'lucide-react';
import { Card, CardHeader, CardContent, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Button, Box, Avatar } from '@mui/material';
import { Input } from '@mui/material';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
    aiInteractiveMessage,
    addChatMessage,
    setChatLoading,
    clearChatHistory,
    openBackdrop,
    openTimelineBackdrop,
    openAnalyticBackdrop,
    closeRequestDocumentsBackdrop,
    closeInviteOthersBackdrop,
    closeAnnouncementBackdrop,
    postTaskList
} from '../../../../store/project/actions';
import sparkle from "../../../../assets/sparkles.svg";
import activity from "../../../../assets/activity.svg";
import doc from "../../../../assets/doc.svg";
import user from "../../../../assets/user.svg";
import paperClip from "../../../../assets/paper-clip.svg";
import ChartUi from "../../../investor/components/ChartUi/ChartUi";
import ErrorBoundary from "../../components/ChartUi/ErrorBoundary";
import chevronsUp from "../../../../assets/chevrons-up.svg";
import close from "../../../../assets/close_green.svg";
import info from "../../../../assets/info.svg";
import graph from "../../../../assets/graph.svg";
import arrowUp from "../../../../assets/arrowUp.svg";
import AnalyticsData from '../AnalyticsData/AnalyticsData';
import Documentations from '../Documentations/Documentations';
import ProjectExecutionChecklist from '../Documentations/ProjectExecutionChecklist';
import InstructionsAndQuestions from './InstructionsAndQuestions';

const heading = {
    developerInfo: "Meet Your Project Developer",
    projectInfo: "Your Renewable Energy Project at a Glance",
    esgImpact: "Environmental and Social Impact",
    financialProjections: "Investment Performance Forecast",
    projectDocuments: "Project Documentation Hub"
};

const subHeading = {
    developerInfo: "Get to know the team behind your renewable energy investment.",
    projectInfo: "Discover the key details and status of your investment project.",
    esgImpact: "Understand the positive change your investment is making.",
    financialProjections: "Analyse the potential financial returns of your investment.",
    projectDocuments: "Access and review all critical project documents."
};

const instructions = {
    developerInfo: "Explore this section to understand the developer's background, expertise, and credibility. Use the prompts below to dive deeper into specific aspects of the developer's profile.",
    projectInfo: "Use the interactive map and information panels to familiarize yourself with the project's location, timeline, and current progress. Click on each prompt for more detailed information.",
    esgImpact: "Review the environmental and social benefits of this project. Use the prompts to access detailed reports and studies on the project's impact.",
    financialProjections: "Explore various financial metrics and projections. Use the interactive tools to view different scenarios and conduct sensitivity analyses.",
    projectDocuments: "Use this secure document repository to view and download important project-related paperwork. Click on each prompt to access the relevant documents or status updates."
};

const instructionsType = {
    developerInfo: [
        "Team Composition & Roles",
        "Experience & Track Record",
        "Due Diligence Report"
    ],
    projectInfo: [
        "Project Details",
        "Projected Timeline",
        "Current Status",
        "Key Stakeholders",
        "Risk Assessment"
    ],
    esgImpact: [
        "Carbon Reduction Impact",
        "Community Impact & Regulatory Compliance",
    ],
    financialProjections: [
        "Projected IRR (Base & Upside Cases)",
        "Annual Cashflow Projections",
        "Operating Costs Breakdown",
        "EBITDA vs. Debt Service",
        "Cumulative Cashflows Graph",
        "Feed-in-Tariff Sensitivity Analysis"
    ],
    projectDocuments: [
        "Key Documentation Checklist",
        "Permit Approval Status",
        "Land Acquisition Progress",
        "Power Purchase Agreement (PPA) Status",
    ]
};

const CustomLoader = () => (
    <Box sx={{ display: 'inline-block', width: '60px', height: '15px', position: 'relative' }}>
        <Box
            sx={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle closest-side,#808080 90%,#0000) 0/calc(100%/3) 100% space',
                clipPath: 'inset(0 100% 0 0)',
                animation: 'l1 1s steps(4) infinite',
                '@keyframes l1': {
                    to: {
                        clipPath: 'inset(0 -30% 0 0)',
                    },
                },
            }}
        />
    </Box>
);

// const PreMadeQuestions = ({ typeOfQ, onQuestionClick }) => {
//     const questions = {
//         developerInfo: [
//             "What's the team composition and their roles?",
//             "What's their experience and track record?",
//             "What sort of due diligence has been done on the developer?"
//         ],
//         projectInfo: [
//             "Tell me more about the project details",
//             "What's the projected timeline?",
//             "What's the current status of the project?",
//             "Who are the relevant parties and their roles?",
//             "What are the key risks to the success of the project?"
//         ],
//         esgImpact: [
//             "What's the carbon reduction impact on this project?",
//             "What's the project impact to the local community?",
//             "Has studies been conducted to ensure regulatory compliance?"
//         ],
//         financialProjections: [
//             "What's the projected IRR returns for both base case and upside case?",
//             "Can you show me annual cashflow projections over time?",
//             "Can you show me the breakdown of operating costs?",
//             "What's your projected EBITDA overtime against debt service?",
//             "Please show me a graph of the cumulative cashflows over time.",
//             "Can you provide sensitive analysis on the returns if Feed-in-Tariffs is varied by 20% on both directions?"
//         ],
//         projectDocuments: [
//             "What are the key documentations that are required for a solar farm?",
//             "Has the relevant permit approval been obtained?",
//             "Can you show me what's been submitted thus far?",
//             "Can you share where we stand on the land acquisition?",
//             "Has the Power Purchase Agreement (PPA) be finalised?",
//             "Can you see a copy of the draft or final agreement?"
//         ]
//     };

//     return (
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {questions[typeOfQ]?.map((question, index) => (
//                 <Box
//                     key={index}
//                     sx={{
//                         width: "fit-content",
//                         padding: "16px",
//                         borderRadius: "8px",
//                         border: "1px solid #008080",
//                         cursor: "pointer",
//                         backgroundColor: '#ffffff',
//                         '&:hover': {
//                             backgroundColor: "#f5f5f5",
//                             border: "1px solid #008080"
//                         }
//                     }}
//                     onClick={() => onQuestionClick(question)}
//                 >
//                     <Typography sx={{ fontSize: "14px", fontFamily: "Manrope", fontWeight: "500", color: "#008080" }}>
//                         {question}
//                     </Typography>
//                 </Box>
//             ))}
//         </Box>
//     );
// };

// const InstructionsAndQuestions = ({ typeOfQ, instructions, instructionsType, onQuestionClick }) => (
//     <>
//         <Box sx={{
//             position: 'relative',
//             backgroundColor: '#F2F2F2',
//             padding: '16px',
//             borderRadius: '4px',
//             zIndex: 2000,
//             maxWidth: '800px',
//             marginTop: '10px',
//             width: "100%"
//         }}>
//             <Typography sx={{ fontSize: '14px', color: '#6D6D6D' }}>
//                 {instructions[typeOfQ] || "Select your question here"}
//             </Typography>
//             <List dense sx={{ padding: 0, listStyleType: 'disc', pl: 4 }}>
//                 {instructionsType[typeOfQ]?.map((item, index) => (
//                     <ListItem key={index} sx={{
//                         display: 'list-item',
//                         padding: '0px 0px',
//                         '&::marker': {
//                             fontSize: '14px',
//                             color: '#666'
//                         }
//                     }}>
//                         <ListItemText
//                             primary={item}
//                             primaryTypographyProps={{
//                                 fontSize: '14px',
//                                 color: '#6D6D6D'
//                             }}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>

//         <Box sx={{
//             display: "flex",
//             flexDirection: "column",
//             position: "relative",
//             backgroundColor: "#ffffff",
//             padding: "24px 0px",
//             borderRadius: "8px",
//             margin: "0px 8px",
//             zIndex: 1000
//         }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, cursor: "pointer" }}>
//                 <Typography sx={{ fontFamily: "Manrope-Semibold", fontSize: "15px", }}>
//                     {"You can also search for"}
//                 </Typography>
//             </Box>
//             <Box sx={{ marginTop: 2 }}>
//                 <PreMadeQuestions typeOfQ={typeOfQ} onQuestionClick={onQuestionClick} />
//             </Box>
//         </Box>
//     </>
// );

const ChatAI = () => {
    const [query, setQuery] = useState('');
    const { uuid, typeOfQ } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chatHistory = useSelector((state) => state.project.chatHistory);
    const isLoading = useSelector((state) => state.project.chatLoading);
    const [preQuestions, setPreQuestions] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const projectGenAIAnswer = useSelector((state) => state?.project?.projectGenAIAnswer);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const chatContainerRef = useRef(null);
    const token = useSelector((state) => state?.auth?.token);
    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const [showInstructions, setShowInstructions] = useState(true);
    const [showInstructionsU, setShowInstructionsU] = useState(false);
    const [lastQuestionIndex, setLastQuestionIndex] = useState(-1);

    const prevTypeOfQ = useRef(typeOfQ);
    const isFirstLoad = useRef(true);


    // useEffect(() => {
    //     if (projectGenAIAnswer) {
    //         dispatch(addChatMessage({ type: 'ai', message: { ...projectGenAIAnswer } }));
    //         dispatch(setChatLoading(false));
    //     }
    // }, [projectGenAIAnswer, dispatch]);
    useEffect(() => {
        if (prevTypeOfQ.current !== typeOfQ || chatHistory?.length === 0) {
            let instructionsMessage;
            if (typeOfQ) {
                instructionsMessage = {
                    type: 'instructions',
                    content: {
                        typeOfQ,
                        instructions,
                        instructionsType
                    }
                };
            }
            else {
                instructionsMessage = {
                    type: 'instructions',
                    content: {
                        typeOfQ: 'projectInfo',
                        instructions,
                        instructionsType
                    }
                };
            }
            dispatch(addChatMessage(instructionsMessage));

            prevTypeOfQ.current = typeOfQ;
        }
    }, [typeOfQ, dispatch, chatHistory]);


    useEffect(() => {
        if (showInstructions) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showInstructions]);

    useEffect(() => {
        const scrollToNinetyPercent = () => {
            if (chatContainerRef.current) {
                const scrollHeight = chatContainerRef.current.scrollHeight;
                const ninetyPercentScroll = scrollHeight * 1;
                chatContainerRef.current.scrollTop = ninetyPercentScroll;
            }
        };

        scrollToNinetyPercent();
    }, [chatHistory]);

    useEffect(() => {
        const handleScroll = () => {
            if (chatContainerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 2; // 10px threshold
                setIsScrolledToBottom(isAtBottom);
            }
        };

        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (chatContainer) {
                chatContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handlePreMadeQuestionClick = (question) => {
        setQuery(question);
        handleSubmitQuestion(question);
        setPreQuestions(!preQuestions);
        setIsScrolledToBottom(false)
    };

    function handleFocus(event) {
        event.target.style.border = 'none';
        event.target.style.outline = 'none';
    }

    function handleQuery(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent form submission if within a form
            console.log('Enter key pressed, submitting query:', e.target.value);
            handleSubmit();
        } else if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault(); // Prevent default behavior
            setQuery(prevQuery => prevQuery + '\n'); // Add a new line to the query
        } else {
            setQuery(e.target.value);
        }
    }

    const questionToggle = () => {
        setPreQuestions(!preQuestions)
    }
    const showTimeline = async () => {
        await dispatch(openTimelineBackdrop());
    }
    const showAnalytics = async () => {
        await dispatch(openAnalyticBackdrop());
    }

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleFileRemove = (fileToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const data = {
            "requestType": "",
            "subject": "",
            "description": query,
            "uuid": uuid,
            "docLabel": "",
            "docText": ""
        }

        if (selectedFiles.length > 0) {
            setPreQuestions(false)
            setIsScrolledToBottom(false)
            await handleFileSubmit(data, selectedFiles);
        } else {
            if (query.trim()) {
                dispatch(addChatMessage({ type: 'user', message: query }));
                setQuery('');
                dispatch(setChatLoading(true));
                setPreQuestions(false);
                setIsScrolledToBottom(false);
                setShowInstructions(false);
                setLastQuestionIndex(chatHistory.length);
                try {
                    await dispatch(aiInteractiveMessage(data));

                } catch (error) {
                    console.error('Error calling AI:', error);
                    dispatch(setChatLoading(false));
                }
            }
        }
    };

    const handleSubmitQuestion = async (quest) => {
        const data = {
            "requestType": "",
            "subject": "",
            "description": quest,
            "uuid": uuid,
            "docLabel": "",
            "docText": ""
        }
        if (quest.trim()) {
            dispatch(addChatMessage({ type: 'user', message: quest }));
            setQuery('');
            dispatch(setChatLoading(true));
            setShowInstructions(false);

            try {
                await dispatch(aiInteractiveMessage(data));
            } catch (error) {
                console.error('Error calling AI:', error);
                dispatch(setChatLoading(false));
            }
        }

    };

    const downloadCSV = (csvContent, filename = 'data.csv') => {
        try {
          const BOM = '\uFEFF';
          const csvData = BOM + csvContent;
          const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
      
        } catch (error) {
          console.error('Download CSV Error:', error);
        }
      };

    const handleFileSubmit = async (data, files) => {
        dispatch(addChatMessage({ type: 'user', message: `Uploaded files: ${files.map(f => f.name).join(', ')}` }));
        setSelectedFiles([]);
        setQuery('');
        dispatch(setChatLoading(true));

        const formData = new FormData();
        formData.append('uuid', uuid)
        selectedFiles.forEach(file => {
            return formData.append('files', file)
        })

        axios.post('https://dashboard-service-662226239165.asia-southeast1.run.app/ai/uploads?prompt=summarize', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token?.idToken,
            },
        })
            .then(response => {

                dispatch(addChatMessage({ type: 'ai', message: response?.data }));
                dispatch(setChatLoading(false));
            })
            .catch(error => {
                dispatch(setChatLoading(false));
            });

    };

    const handleDocClick = () => {
        if (uuid) {
            window.open(`/project/documentation/${uuid}`, '_blank');
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ backgroundColor: "#ffffff", padding: "4px 16px 16px 16px", borderRadius: "8px", width: "100%" }}>
                <Box pt={1.5} pl={0.8} pb={1}>
                    <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <Typography sx={{ color: "#000000", fontFamily: 'Manrope-Bold', fontSize: "22px", letterSpacing: "0.8px", wordSpacing: "1px", fontWeight: '700', }}>
                            {heading[typeOfQ] ? heading[typeOfQ] : "This is the place to find out more about the project"}
                        </Typography>

                        <Box sx={{ position: 'relative', paddingLeft: "16px", paddingTop: "8px", cursor: "pointer" }}
                            onMouseEnter={() => setShowInstructionsU(true)}
                            onMouseLeave={() => setShowInstructionsU(false)}>
                            <img src={info} height={20} />
                            {showInstructionsU && (
                                <Box sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: '#F2F2F2',
                                    padding: '16px',
                                    borderRadius: '4px',
                                    zIndex: 2000,
                                    maxWidth: '800px',
                                    marginTop: '10px',
                                    width: "40vw"
                                }}>
                                    <Typography sx={{ fontSize: '14px', color: '#6D6D6D', letterSpacing: "0.9px", wordSpacing: "1px" }}>
                                        {instructions[typeOfQ] ? instructions[typeOfQ] : "Select your question here"}
                                    </Typography>
                                    <List dense sx={{ padding: 0, listStyleType: 'disc', pl: 4 }}>
                                        {instructionsType[typeOfQ]?.map((item, index) => (
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
                                                        color: '#6D6D6D', letterSpacing: "0.9px", wordSpacing: "1px"
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <p style={{ color: '#A1A1A1', fontFamily: "Manrope-Medium", marginTop: "6px", fontWeight: "500", fontSize: "14px", }}>{subHeading[typeOfQ] ? subHeading[typeOfQ] : "Type your queries or select a query from our pre-made Questions our AI will give a personalised solution for you."}</p>
                </Box>
                <Box sx={{
                    height: 'calc( 100vh - 262px)', overflowY: 'auto', mb: 1, padding: "16px 8px", backgroundColor: "#ffffff", borderRadius: '4px',
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#e0e0e0',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#339999',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#9e9e9e',
                    },
                }}
                    ref={chatContainerRef}
                >

                    {chatHistory && chatHistory?.map((chat, index) => (
                        <React.Fragment key={index}>
                            {chat?.type === 'instructions' ? (
                                <>
                                    <InstructionsAndQuestions
                                        typeOfQ={chat?.content?.typeOfQ}
                                        instructions={chat?.content?.instructions}
                                        instructionsType={chat?.content?.instructionsType}
                                        onQuestionClick={handlePreMadeQuestionClick}
                                    />
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: chat?.type === 'user' ? 'flex-start' : 'flex-start', mt: 2 }}>
                                    {chat?.type === 'user' && <Box sx={{ borderRadius: "8px", padding: "12px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", height: "20px", width: "20px", marginRight: "8px", border: "1px solid #E2E2E2" }}>
                                        <img src={user} height={20} />
                                    </Box>}
                                    {chat?.type === 'ai' && <Box sx={{ borderRadius: "8px", padding: "12px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", height: "20px", width: "20px", marginRight: "8px", border: "1px solid #E2E2E2" }}>
                                        <img src={sparkle} height={20} />
                                    </Box>}
                                    <Card sx={{ maxWidth: '90%', boxShadow: 'none', width: chat?.message?.responseType === 'code' ? "90%" : "auto", backgroundColor: chat?.type === 'user' ? "#ffffff" : "#ffffff" }}>
                                        <CardContent sx={{ padding: "4px 0px 0px 0px", paddingBottom: "0px!important" }}>
                                            {chat?.type === 'user' &&
                                                <Box sx={{ backgroundColor: "#008080", padding: "2px 4px 2px 0px", borderRadius: "4px" }}>
                                                    <p style={{ whiteSpace: "pre-line", color: "#ffffff", overflowWrap: 'break-word', margin: "6px 8px", wordBreak: 'normal', letterSpacing: "0.7px", wordSpacing: "1px", fontFamily: "Manrope-Medium", textWrap: 'wrap', fontSize: "15px", lineHeight: "22px" }}> {chat?.message}</p>
                                                </Box>
                                            }
                                            {chat?.type === 'ai' && chat?.message?.responseType === 'text' &&
                                                <Box sx={{ backgroundColor: "#EBF2FC", padding: "2px 4px 2px 0px", borderRadius: "4px" }}>
                                                    <p style={{ color: "#333333", whiteSpace: "pre-line", overflowWrap: 'break-word', margin: "8px", fontFamily: "Manrope-Medium", wordBreak: 'normal', textWrap: 'wrap', letterSpacing: "0.7px", wordSpacing: "1px", fontWeight: "500", lineHeight: "22px", fontSize: "15px" }}> {chat?.message?.textResponse?.trim()}</p>
                                                </Box>
                                            }
                                            {chat?.type === 'ai' && chat?.message?.responseType === 'doc' &&
                                                <Box sx={{ backgroundColor: "#EBF2FC", padding: "2px 4px 2px 0px", borderRadius: "4px", cursor: "pointer" }}  >
                                                    <p style={{ color: "#333333", whiteSpace: "pre-line", overflowWrap: 'break-word', margin: "8px", fontFamily: "Manrope-Medium", wordBreak: 'normal', textWrap: 'wrap', letterSpacing: "0.7px", wordSpacing: "1px", fontWeight: "500", lineHeight: "22px", fontSize: "15px" }}> {chat?.message?.textResponse?.trim()}</p>

                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{
                                                            textTransform: "capitalize",
                                                            width: "200px",
                                                            margin: "8px 16px",
                                                            height: "50px",
                                                            fontSize: "14px",
                                                        }}
                                                        onClick={handleDocClick}
                                                        startIcon={<img src={doc} height={"30px"} />}
                                                    >
                                                        View Documents
                                                    </Button>
                                                </Box>
                                            }
                                            {chat?.type === 'ai' && chat?.message?.responseType === 'csv' &&
                                                <Box sx={{ backgroundColor: "#EBF2FC", padding: "2px 4px 2px 0px", borderRadius: "4px" }}>
                                                    <p style={{
                                                        color: "#333333",
                                                        whiteSpace: "pre-line",
                                                        overflowWrap: 'break-word',
                                                        margin: "8px",
                                                        fontFamily: "Manrope-Medium",
                                                        wordBreak: 'normal',
                                                        textWrap: 'wrap',
                                                        letterSpacing: "0.7px",
                                                        wordSpacing: "1px",
                                                        fontWeight: "500",
                                                        lineHeight: "22px",
                                                        fontSize: "15px"
                                                    }}>
                                                        {chat?.message?.textResponse?.trim()}
                                                    </p>

                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{
                                                            textTransform: "capitalize",
                                                            width: "200px",
                                                            margin: "8px 16px",
                                                            height: "50px",
                                                            fontSize: "14px",
                                                        }}
                                                        
                                                        onClick={() => downloadCSV(chat?.message?.textResponse, 'data.csv')}
                                                        startIcon={<img src={doc} height={"30px"} />}
                                                    >
                                                        Download CSV
                                                    </Button>
                                                </Box>
                                            }
                                            {chat?.type === 'ai' && chat?.message?.responseType === 'code' &&
                                                <>
                                                    <ErrorBoundary>
                                                        <ChartUi message={chat?.message?.jsonObject} />
                                                    </ErrorBoundary>
                                                </>
                                            }
                                        </CardContent>
                                    </Card>
                                </Box>
                            )}
                        </React.Fragment>
                    ))}

                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, pb: 4, mt: 2 }}>
                            <Box sx={{ borderRadius: "8px", padding: "12px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", height: "20px", width: "20px", marginRight: "8px", border: "1px solid #E2E2E2" }}>
                                <img src={sparkle} height={20} />
                            </Box>
                            <Card sx={{ boxShadow: 'none', maxWidth: '70%', backgroundColor: 'background.paper', display: 'flex', alignItems: 'center', p: 2 }}>
                                <CustomLoader />
                            </Card>
                        </Box>
                    )}
                    <div ref={chatEndRef} />
                </Box>
                <Box >
                </Box>

                <Box sx={{ backgroundColor: "#ffffff", padding: "8px", borderRadius: "8px", position: "relative" }}>
                    {/* <Box >
                        {!preQuestions && <Box onClick={questionToggle} sx={{
                            display: "flex", position: "absolute",
                            right: "5%", top: "-26%",

                            backgroundColor: "#F2F2F2",
                            padding: "4px 16px",
                            borderRadius: "4px",
                            zIndex: 1000, justifyContent: "flex-end", alignItems: "center", gap: 2, cursor: "pointer"
                        }}>
                            <Typography sx={{ color: "#008080", fontSize: "15px", }}>
                                Expand to see pre-made questions
                            </Typography>
                            <img src={chevronsUp} height={24} />
                        </Box>
                        }

                        {preQuestions && (
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                position: "absolute",
                                bottom: "100%", // Position above the chat input
                                left: 0,
                                right: 0,
                                backgroundColor: "#ffffff",
                                padding: "24px 0px",
                                borderRadius: "8px",
                                margin: "0px 8px",
                                zIndex: 1000
                            }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, cursor: "pointer" }}>
                                    <Typography sx={{ fontFamily: "Manrope", fontSize: "15px", }}>
                                        {"Select your question here"}
                                    </Typography>
                                    <Box onClick={questionToggle}>
                                        <img src={close} height={24} alt="Close" />
                                    </Box>
                                </Box>
                                <Box sx={{ marginTop: 2 }}>
                                    <PreMadeQuestions typeOfQ={typeOfQ} onQuestionClick={handlePreMadeQuestionClick} />
                                </Box>
                            </Box>
                        )}
                    </Box> */}
                    <Box sx={{ padding: "0px", borderRadius: "8px", marginTop: "0px", backgroundColor: "#F2F2F2" }}>
                        <form onSubmit={handleSubmit} className="flex space-x-2">
                            <Box sx={{ padding: "12px 8px", width: "100%", display: "flex", flexDirection: "row" }}>
                                <textarea
                                    style={{ width: "100%", height: "24px", border: "none", backgroundColor: "#F2F2F2", borderRadius: "8px", padding: "8px", fontFamily: "Manrope-Medium", resize: "none" }}
                                    placeholder="Type your Queries here...."
                                    id="outlined-multiline-flexible"
                                    multiline
                                    maxRows={4}
                                    minRows={4}
                                    value={query}
                                    onChange={handleQuery}
                                    onKeyDown={handleQuery}
                                    onFocus={handleFocus}
                                />
                                <Box sx={{ display: "flex", justifyContent: "space-between", padding: "0px 8px" }}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                                ref={fileInputRef}
                                                multiple
                                            />
                                            <IconButton onClick={() => fileInputRef.current.click()}>
                                                <img src={paperClip} alt="Attach file" height={24} />
                                            </IconButton>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    height: "36px",
                                                    textTransform: "none",
                                                    fontSize: "16px",
                                                    minWidth: 0,
                                                    padding: "6px 8px 6px 20px",
                                                    marginLeft: "12px",
                                                    marginRight: "8px",
                                                    "& .MuiButton-startIcon": {  // This targets the startIcon wrapper
                                                        marginRight: "4px",  // Remove default right margin
                                                        marginLeft: "-8px",  // Adjust left margin if needed
                                                        position: "relative",  // Add if you need more precise positioning
                                                        "& img": {  // This targets the img inside startIcon
                                                            height: "16px",
                                                            width: "16px"
                                                        }
                                                    }
                                                }}
                                                startIcon={<img src={arrowUp} height={16} />}
                                            >
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
            }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    alignItems: 'center',
                    backgroundColor: "#ffffff", margin: "0px 0px 0px 8px", cursor: "pointer", width: "56px", borderRadius: "8px",
                    gap: 2,
                    flex: 1,
                    justifyContent: 'center',

                }
                } onClick={showAnalytics}>
                    <img src={graph} height={24} />
                    <Typography sx={{
                        color: '#008080',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        textAlign: 'center',
                    }}>
                        {"See analytical data"}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    alignItems: 'center',
                    backgroundColor: "#ffffff", margin: "0px 0px 0px 8px", cursor: "pointer", width: "56px", borderRadius: "8px",
                    flex: 1,
                    justifyContent: 'center',
                    gap: 2,
                }} onClick={showTimeline}>
                    <img src={activity} height={24} style={{ transform: 'rotate(90deg)' }} />
                    <Typography sx={{
                        color: '#008080',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        textAlign: 'center',
                    }}>
                        {"Project Execution Timeline"}
                    </Typography>
                </Box>
            </Box>

            <AnalyticsData />

            <ProjectExecutionChecklist />

        </Box>
    );
};

export default ChatAI;