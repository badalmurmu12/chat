import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Avatar } from "@mui/material";
import documents from '../../../../assets/documents.svg';
import mail from '../../../../assets/maile.svg';
import calendar from '../../../../assets/calendar.svg';
import grabiella from '../../../../assets/grabieela.png';
import arrowrightblue from '../../../../assets/arrow-right-blue.svg';

import * as projectActions from '../../../../store/project';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { motion, useScroll } from "framer-motion";

const Task = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const [isWide, setIsWide] = useState(false);
  const [activeDiv, setActiveDiv] = useState(null);
  const project = useSelector((state) => state?.project);

  let task = useSelector((state) => state?.project?.taskList);
  if (task && typeof (task) === 'string') {
    task = JSON.parse(task);
  }
  useEffect(() => {
    async function fetchTaskData(uuid) {
      const task = await dispatch(projectActions?.getTaskList(uuid))

    }
    fetchTaskData(uuid);
  }, [uuid]);

  useEffect(() => {
    if (project?.animationtask) {
      const sequence = [1, 2, 3];
      let sequenceIndex = 0;
      let loopCount = 0;

      const animateNextDiv = () => {
        if (sequenceIndex < sequence.length) {
          setActiveDiv(sequence[sequenceIndex]);
          setTimeout(() => {
            setActiveDiv(null);
            sequenceIndex++;
            setTimeout(animateNextDiv, 300); // Wait 300ms before next animation
          }, 300);
        } else {
          sequenceIndex = 0;
          loopCount++;
          if (loopCount < 3) {
            setTimeout(animateNextDiv, 300); // Start next loop after 300ms
          }
        }
      };

      animateNextDiv(); // Start the animation

      return () => {
        setActiveDiv(null); // Reset on unmount or when effect re-runs
      };
    }
  }, [project?.animationtask]);



  const getAnimationProps = (divNumber) => ({
    animate: {
      scale: activeDiv === divNumber ? 0.90 : 1,
    },
    transition: { duration: 0.5 }
  });

  const onTaskClick = async (step) => {
    if (step === 1) {
      await dispatch(projectActions?.highlightDocuments())
      setTimeout(async () => {
        await dispatch(projectActions?.highlightDocumentsNot());
      }, 4000);
    } else if (step === 2) {
      await dispatch(projectActions?.highlightIamInterest())
      setTimeout(async () => {
        await dispatch(projectActions?.highlightIamInterestNot());
      }, 4000);
    }
    else if (step === 3) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      await dispatch(projectActions?.highlightMoreQuestion())
      setTimeout(async () => {
        await dispatch(projectActions?.highlightMoreQuestionNot());
      }, 4000);
    }

  }

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column", backgroundColor: "#fff", marginTop: "16px", padding: "16px 16px 32px 16px", borderRadius: "8px", boxShadow: "0px 0px 4px 0px #E5E5E5" }}>
      <Box pb={0}>
        <Typography sx={{ color: "#12190F", fontSize: "18px", fontWeight: "700" }}>
          Tasks
        </Typography>
      </Box>
      <motion.div {...getAnimationProps(1)}

      >

        <Box onClick={() => onTaskClick(1)} sx={{ display: "flex", flexDirection: "column", gap: 0, justifyContent: 'space-around', backgroundColor: "#EBF2FC", borderRadius: "8px", opacity: "0.8", padding: "16px", marginTop: "8px", border: "1px solid #6095E6", cursor: "pointer" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: 'space-between' }}>
            <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "16px", letterSpacing: "0.9px" }}>1. Discover Your Next Opportunity</Typography>
            <Box><img src={arrowrightblue} /></Box>
          </Box>
          {uuid != 'da98dd39-8ab6-42cc-9c62-99497d06ac10' ? <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }}>Two essential documents await your review:</Typography>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }}>a. Investment Teaser: Your project snapshot and opportunity overview</Typography>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }}>b. Term Sheet: Proposed deal terms at a glance </Typography>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }}>Ready to explore? Dive in and see what's possible!</Typography>
          </Box> :
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }}>Ready to explore? Dive in and see what's possible!</Typography>
            </Box>
          }
        </Box>
      </motion.div>
      <motion.div
        {...getAnimationProps(2)}

      >
        <Box onClick={() => onTaskClick(2)} sx={{ display: "flex", flexDirection: "column", gap: 0, justifyContent: 'space-around', backgroundColor: "#EBF2FC", borderRadius: "8px", opacity: "0.8", padding: "16px", marginTop: "8px", border: "1px solid #6095E6", cursor: "pointer" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 0, justifyContent: 'space-between' }}>
            <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "16px", letterSpacing: "0.9px" }}>2. Like what you see?</Typography>
            <Box><img src={arrowrightblue} /></Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }}>Click "I'm Interested" to register</Typography>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }}>and get your next steps.</Typography>
          </Box>
        </Box>
      </motion.div>
      <motion.div
        {...getAnimationProps(3)}

      >
        <Box onClick={() => onTaskClick(3)} sx={{ display: "flex", flexDirection: "column", gap: 0, justifyContent: 'space-around', backgroundColor: "#EBF2FC", borderRadius: "8px", opacity: "0.8", padding: "16px", marginTop: "8px", border: "1px solid #6095E6", cursor: "pointer" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 0, justifyContent: 'space-between' }}>
            <Typography sx={{ color: "#12190F", fontWeight: "700", fontSize: "16px", letterSpacing: "0.9px" }}>3. Dive Deeper</Typography>
            <Box><img src={arrowrightblue} /></Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }} >* Connect with developer</Typography>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }} >* Review project documents</Typography>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }} >* Chat with Refy Team</Typography>
            <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "14px" }} >Your due diligence, made easy. Let's explore together!</Typography>
          </Box>

        </Box>
      </motion.div>
      {task?.length > 0 &&

        task?.map((tsk, index) => {

          let data = [];
          if (tsk) {
            data = JSON.parse(tsk?.data);
          }

          // console.log("task", JSON.parse(tsk?.data));
          return (
            <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: 'space-around', backgroundColor: "#FEEFF080", borderRadius: "8px", opacity: "0.8", padding: "16px", marginTop: "8px", border: "1px solid #C1D6F5" }}>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: 'space-between' }}>
                <Typography sx={{ color: "#F55B64", fontSize: "14px" }}>{data?.priority}</Typography>
                <Typography sx={{ color: "#9C9C9C", fontSize: "14px" }}>{moment(data?.timestamp).format('LL')}</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "#12190F", fontWeight: "500", fontSize: "18px" }} >{data?.subject}</Typography>
                <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "12px" }}>{data?.description}</Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px  0px",
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
                    <Avatar src={data?.userdata?.photoURL} size="12px" />
                  </Box>
                  <Box>

                  </Box>
                </Box>
              </Box>
            </Box>

          )
        })

      }


    </Box>
  );
};

export default Task;



// <Box>
// <Typography>
//   Alp Technologies Ltd, established in 2017 in London, England,
//   develops affordable smart renewable energy solutions for
//   emerging markets. Specializes in the Mega-BRIC Battery System, a
//   maintainable and cost-effective clean energy solution. View More
// </Typography>
// </Box>



{/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: 'space-around', backgroundColor:"#FEEFF080", borderRadius:"8px", opacity:"0.8", padding:"16px", marginTop:"16px", border:"1px solid #FCCCCF"}}>
<Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: 'space-between' }}>
  <Typography sx={{ color: "#F55B64", fontSize: "14px" }}>High Priority</Typography>
  <Typography sx={{ color: "#9C9C9C", fontSize: "14px" }}>20 may 2020</Typography>
</Box>
<Box>
  <Typography sx={{ color: "#12190F", fontWeight:"500",  fontSize: "18px" }} >View files from Refy</Typography>
  <Typography variant='p' sx={{ color: "#9C9C9C", fontSize: "12px" }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Typography>
</Box>
<Box sx={{ width: "100%" }}>
<Box
  sx={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px  0px",
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
    <Avatar src={grabiella} size="12px"/>
  </Box>
  <Box>
     
  </Box>
</Box>
</Box>
</Box> */}