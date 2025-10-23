import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function VerificationEmail() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" , height:'100vh'}}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            maxWidth:"50%",
            gap: "16px"
          }}
        >
          <Typography
            component="h4"
            variant="h4"
            sx={{ color: "#12190F", fontSize: "24px", fontWeight: "700" }}
          >
            Email Verification
          </Typography>
          <Typography
            component="p"
            variant="p"
            sx={{ color: "#ABABAB", fontSize: "14px", fontWeight: "500" }}
          >
            An email Link has been sent to your inbox click on that link to get
            verified. Click the button below to resend the email
          </Typography>
          <Button  fullWidth
              variant="contained">
            Resend email
          </Button>
        </Box>
      </Box>
    </>
  );
}
