import { ReactElement, useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import pending from "../../../assets/pending.svg";
import todo from "../../../assets/todo.svg";
import next from "../../../assets/next.svg";
import done from "../../../assets/done.svg";

function UnfinishedOnboarding() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <CssBaseline />
        <Box pt={3}>
          <Typography variant="h6">
            Complete the below steps to finish your onboarding
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Box
            sx={{
              width: "421px",
              height: "83px",
              borderRadius: "16px",
              border: "1px solid #E5E5E5",
              padding: "8px",
              opacity:"0.6"
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "row" ,}}>
                <Box sx={{padding:"5px 0px"}}>
                  <img src={done} heigh="24px" />
                </Box>
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
                    sx={{
                      color: "#12190F",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Onboarding Complete 
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#9C9C9C",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Project overview and financing requirements
                  </Typography>
                </Box>
              </Box>
              <Box>
                <img src={next} heigh="24px" />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "421px",
              height: "83px",
              borderRadius: "16px",
              border: "1px solid #E5E5E5",
              padding: "8px",
              opacity:"0.6"
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box>
                  <img src={todo} heigh="24px" />
                </Box>
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
                    sx={{
                      color: "#12190F",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    To do
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#9C9C9C",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Project overview and financing requirements
                  </Typography>
                </Box>
              </Box>
              <Box>
                <img src={next} heigh="24px" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UnfinishedOnboarding;
