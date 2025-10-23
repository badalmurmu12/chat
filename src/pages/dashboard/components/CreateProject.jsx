import { ReactElement, useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import createproject from "../../../assets/createproject.svg";
import AddIcon from "@mui/icons-material/Add";
import CssBaseline from "@mui/material/CssBaseline";
import * as projectActions from "../../../store/project";
import pending from "../../../assets/pending.svg";
import todo from "../../../assets/todo.svg";
import next from "../../../assets/next.svg";

function CreateProject(props) {
  const dispatch = useDispatch();

  const createProject = async () => {
    const authdata = await dispatch(projectActions.openBackdrop());
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "calc(100% - 32px)",
          alignItems: "flex-start",
          padding: "16px",
          borderRadius: "16px",
          border: "1px solid #E5E5E5",
          margin: "16px 0px",
          gap: 4,
        }}
      >
         <CssBaseline />
        <Box pt={3}>
          <img src={createproject} />
        </Box>
        <Box
          sx={{
            width: "421px",
            height: "83px",
            padding: "8px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0px 8px ",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#12190F", fontSize: "28px", fontWeight: "700" }}
                >
                  Create your first project
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#9C9C9C", fontSize: "14px", fontWeight: "500" }}
                >
                  To get started you have to create your very first project
                  Click on create project button to go through the process of
                  creating the project. its easy as uploading the documents.
                </Typography>
              </Box>
              <Box sx={{ paddingTop: "16px" }}>
                <Button
                  variant="contained"
                  onClick={createProject}
                  startIcon={<AddIcon />}
                  sx={{
                    textTransform: "none",
                    width: "200px",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Create project
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CreateProject;
