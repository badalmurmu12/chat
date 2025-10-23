import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../additionalDetails/components/Header";
import appointment from "../../assets/appointment.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CssBaseline from "@mui/material/CssBaseline";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

export default function ScheduleAnAppointment() {
  const navigate = useNavigate();
  let { type } = useParams();
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          height: "calc(100vh - 180px)",
          width: "100%",
        }}
      >
        <CssBaseline />
        <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
          <Box
            sx={{
              height: "400px",
              width: "40%",
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <img src={appointment} height="400px" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "500px",
              width: { xs: "100%", md: "60%" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                pl: 4,
                pr: { md: 5, xs: 1 },
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
                >
                  <Typography
                    component="h4"
                    variant="h4"
                    sx={{
                      color: "#000000",
                      fontSize: "24px",
                      fontWeight: "700",
                      letterSpacing: "0.8px",
                    }}
                  >
                    Schedule an appointment
                  </Typography>
                  <Typography
                    component="p"
                    variant="p"
                    sx={{
                      color: "#ABABAB",
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70%",
                      lineHeight: "18px",
                      fontFamily: "Satoshi-Light",
                      letterSpacing: "0.8px",
                    }}
                  >
                    At Refy, we understand that each developer's needs are
                    unique, and we're committed to providing personalised
                    financing solutions to help you achieve your goals. Once
                    you've selected your preferred financing option(s), our team
                    will work closely with you to tailor a funding plan that
                    maximises the potential of your sustainability-linked
                    projects.
                  </Typography>
                </Box>
                <Box sx={{display:"flex", flexDirection: {xs:"column", sm:"row"},gap: 2, width:{sm:"550px", xs: "100%"}} }>
                  {" "}
                  <Button
              variant="outlined"
              onClick={() => navigate("/lets-chat")}
              startIcon={<PhoneInTalkIcon />}
              sx={{
                textTransform: "none",
                fontWeight: "500",
                fontSize: "14px",
                height:"48px"
              }}
            >
              Contact support
            </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      textTransform: "capitalize",
                      width: { xs: "90%", md: "50%" },
                    }}
                    onClick={() =>{navigate('/dashboard')}}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Go to Dashboard
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
