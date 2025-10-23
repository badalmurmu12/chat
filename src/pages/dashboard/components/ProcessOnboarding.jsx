import { ReactElement, useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import pending from "../../../assets/pending.svg";
import todo from "../../../assets/todo.svg";
import next from "../../../assets/next.svg";
import done from "../../../assets/done.svg";

function ProcessOnboarding(props) {
  const [data, setData] = useState([
    {
      id: "01",
      text: "Getting Info",
      subtext: "Provide us project details, upload pertinent documents",
      status: "Done",
    },

    {
      id: "02",
      text: "Conduct due diligence video call",
      subtext: "We will connect with you to conduct a due diligence call",
      status: "In Progress",
    },

    {
      id: "03",
      text: "Personalisation",
      subtext:
        "Get personalised help on financial modeling + prepare an investor friendly dataroom",
    },

    {
      id: "04",
      text: "Investor funding",
      subtext: "Get funded by investors who understand your needs",
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
        }}
      >
        <CssBaseline />
        <Box pt={3}>
          <Typography
            variant="h6"
            sx={{ color: "#12190F", fontSize: "16px", fontWeight: "700" }}
          >
            Our process is very simple
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
                  borderRadius: "16px",
                  border: "1px solid #E5E5E5",
                  padding: "8px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        paddingLeft: "8px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#008080",
                          fontSize: "40px",
                          fontWeight: "700",
                        }}
                      >
                        {dt.id}
                      </Typography>
                      {dt?.status === "Done" && props?.data?.length > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            backgroundColor: "#F1F8EE",
                            borderRadius: "8px",
                            padding: "4px 8px",
                          }}
                        >
                          <img src={done} />
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#008080",
                              fontSize: "40px",
                              fontWeight: "700",
                              fontSize: "14px",
                            }}
                          >
                            {dt.status}
                          </Typography>
                        </Box>
                      )}

                      {dt?.status === "In Progress" && props?.data?.length > 0 && (
                        <Box sx={{ display: "flex", gap: 0.5, backgroundColor: '#FEF8EB',color:"#E1A632", borderRadius:"8px", padding:"4px 8px" }}>
                          <img src={pending} />
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#E1A632",
                              fontSize: "40px",
                              fontWeight: "700",
                              fontSize: "14px",
                            }}
                          >
                            {dt.status}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0px 8px ",
                        gap: 1,
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
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#9C9C9C",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      3min
                    </Typography>
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

export default ProcessOnboarding;
