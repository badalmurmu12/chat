import { ReactElement, useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import pending from "../../../assets/pending.svg";
import todo from "../../../assets/todo.svg";
import next from "../../../assets/next.svg";
import otherServices from "../../../assets/other_services.svg";

function OtherServices() {
  const [data, setData] = useState([
    {
      id: "01",
      text: "Dataroom",
      subtext: "In Data room, we Manage all your documents specific to yout projects",
    },

    {
      id: "02",
      text: "Stakeholder management",
      subtext: "You can requests actions from other stakeholders and send message",
    },

    {
      id: "03",
      text: "Support",
      subtext:
        "We provide support using Gen AI in every possible area",
    },
 
  ]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "calc(100% - 32px)",
          alignItems: "flex-start",
          gap: 4,
          pb:2
        }}
      >
        <CssBaseline />
        <Box pt={3}>
          <Typography
            variant="h6"
            sx={{ color: "#12190F", fontSize: "16px", fontWeight: "700" }}
          >
            Other services
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {data?.map((dt, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: "33%",
                  height: "auto",
                  borderRadius: "8px",
                  border: "1px solid #E5E5E5",
                  padding: "8px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ padding: "8px", borderRadius:"8px" }}>
                      <img src={otherServices} height={"42px"} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0px 8px ",
                        gap: 0.2,
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
                        {" "}
                        {dt.text}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#9C9C9C",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {dt.subtext}
                      </Typography>
                    </Box>
                  </Box>
           
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default OtherServices;
