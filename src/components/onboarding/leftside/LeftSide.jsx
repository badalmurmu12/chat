import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import smallLogo from "../../../assets/logosmall.png";
import autoscale from "../../../assets/autoscale.png";
import blinker from "../../../assets/blinker.png";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  placholder: {},
});

export default function LeftSide() {
  const theme = useTheme();
  return (
    <>
      <Box
        sm={4}
        md={5}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          height: "calc(100vh - 32px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: " space-between",
          margin: "16px",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "16px",
            justifyContent: "flex-start",
            maxWidth: "440px",
          }}
        >
          <img src={smallLogo} />
        </Box>
        <Box sx={{ display: "flex", flex: 1, flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "auto",
                height: {
                  xs: "243px",
                  sm: "243px",
                  md: "343px",
                  lg: "443px",
                  xl: "443px",
                },
              }}
            >
              <img src={autoscale} height="100%" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                padding: {
                  xs: "0px 10px",
                  sm: "0px 10px",
                  md: "0px 50px",
                  lg: "0px 100px",
                  xl: "0px 100px",
                },
              }}
            >
              <Typography component="h3" variant="h4" sx={{ color: "#ffffff" }}>
                Build To Scale Sustainable Finance
              </Typography>

              <Typography component="h6" variant="h6" sx={{ color: "#ffffff" }}>
                Streamlining green investments for developers and investors
              </Typography>
            </Box>
            <Box sx={{ height: "24px", mt: 4 }}>
              <img src={blinker} height="8px" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
