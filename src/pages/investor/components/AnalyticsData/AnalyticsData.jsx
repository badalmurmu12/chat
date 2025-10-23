import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Backdrop,
  IconButton,
  CircularProgress,
  Grid,
  Divider
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AnalyticsHeader from "./AnalyticsHeader";
import CustomFileView from "../CustomFileView/CustomFileView";
import ErrorBoundary from "../ChartUi/ErrorBoundary";
import ChartUi from "../ChartUi/ChartUi";
import * as projectActions from "../../../../store/project";
import { Divide } from "lucide-react";

function AnalyticsData(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { uuid, typeOfQ } = useParams();
  const handleSubmit = async (companyData) => {
  };
  const project = useSelector((state) => state.project);
  const projectGenAIAnalytics = useSelector((state) => state?.project?.projectGenAIAnalytics);

  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    async function fetchProjectAirData() {

      const company = await dispatch(projectActions.aiAnalytics(uuid));
    }
    fetchProjectAirData();
  }, [uuid]);


  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const saveToSummary = async () => { };
  const handleClose = async () => {

    const authdata = await dispatch(projectActions.closeAnalyticBackdrop());
  };

  return (
    <>
      <Box>

        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,54,54, 0.44)",
          }}
          open={project?.openAnalysisBackdrop}

        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ width: "59%", height: "100vh", opacity: "0" }} onClick={handleClose}>

            </Box>
            <Box
              sx={{
                backgroundColor: "#fff",
                height: "calc(100vh)",
                width: "40%",
                padding: "24px 24px",
                overflowY: "auto",
                borderRadius: "8px"
              }}
            >
              <AnalyticsHeader />

              {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: "wrap",
                gap: "8px",
                pt: 2,
              }}
            >

              {projectGenAIAnalytics.map((file) => (
                <CustomFileView
                  key={file.id}
                  file={file}
                  onClick={() => handleFileClick("file")}
                />
              ))}


            </Box> */}

              <Grid container spacing={2} mt={4}>
                <Grid item xs={12} sx={{ paddingBottom: "16px" }}>
                  {projectGenAIAnalytics?.map((file) => (
                    <CustomFileView
                      key={file?.id}
                      file={file}
                      onClick={() => handleFileClick(file)}
                    />
                  ))}
                </Grid>
                {/* <Grid item xs={6}>
                {projectGenAIAnalytics?.filter((_, index) => index % 2 !== 0).map((file) => (
                  <CustomFileView
                    key={file?.id}
                    file={file}
                    onClick={() => handleFileClick(file)}
                  />
                ))}
              </Grid> */}
              </Grid>
              {/* {selectedFile && (
              <Box sx={{ mt: 2 }}>
                <ChartUi message={selectedFile === "file1" ? "{\"type\":\"bar\",\"data\":{\"labels\":[\"2019\",\"2020\",\"2021\",\"2022\",\"2023\"],\"datasets\":[{\"label\":\"Sales\",\"data\":[65000,59000,80000,81000,56000],\"backgroundColor\":\"rgba(75, 192, 192, 0.6)\"}]}}" : "{\"type\":\"bar\",\"data\":{\"labels\":[\"Q1\",\"Q2\",\"Q3\",\"Q4\"],\"datasets\":[{\"label\":\"Revenue\",\"data\":[20000,25000,30000,35000],\"backgroundColor\":\"rgba(153, 102, 255, 0.6)\"}]}}"} />
              </Box>
            )} */}
            </Box>
          </Box>
        </Backdrop>
      </Box>
    </>
  );
}

export default AnalyticsData;
