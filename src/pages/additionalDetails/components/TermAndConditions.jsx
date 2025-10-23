import React, { useState } from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as authActions from "../../../store/auth";

import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import data_secure from "../../../assets/data_secure.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    maxWidth: "100%",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function TermAndConditions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [termnCond, setTermncond] = useState(false);
  const [showTnC, setShowTnC] = useState(false);

  const termAndConditions = async () => {
    const tnc = await dispatch(
      authActions.termNConditionAccept({
        TnC: true,
      })
    );
    navigate("/onboarding/company");
  };

  const handleChange = (event) => {
    setTermncond(event.target.checked);
  };

  const showTnCDiv = () => {
    setShowTnC(!showTnC);
  };

  return (
    <>
      <BootstrapDialog
        onClose={showTnCDiv}
        aria-labelledby="customized-dialog-title"
        open={showTnC}
        sx={{ width: "100%", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%" }}
      >
        <DialogTitle sx={{ m: 2, p: 2 }} id="customized-dialog-title">
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "8px", pt: 2 }}
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
              Refy Terms and Conditions
            </Typography>
            <Typography
              component="p"
              variant="p"
              sx={{
                color: "#ABABAB",
                fontSize: "14px",
                fontWeight: "600",
                width: "100%",
                lineHeight: "18px",
                fontFamily: "Satoshi-Light",
                letterSpacing: "0.8px",
              }}
            >
              Please read these Terms and Conditions ("Terms") carefully before
              using the Refy web portal (the "Portal") operated byRefy Pte. Ltd.
              ("Refy," "we," "us," or "our"). By accessing or using the Portal,
              you agree to be bound by these Terms. If you do not agree to these
              Terms, you may not use the Portal.
            </Typography>
          </Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={showTnCDiv}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "16px",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
              >
                1. Use of the Portal
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "8px 16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                a. The Portal is intended for users who are interested in
                sustainability-linked projects, including investors seeking
                investment opportunities and project developers seeking
                financing, advisory, or other services provided by Refy.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                b. By using the Portal, you represent and warrant that you are
                of legal age to form a binding contract and are not prohibited
                from using the Portal under applicable laws.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                c. You agree to provide accurate, current, and complete
                information when using the Portal and to update such information
                as necessary to maintain its accuracy.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                d. You are responsible for maintaining the confidentiality of
                your account and password and for restricting access to your
                computer or device. You agree to accept responsibility for all
                activities that occur under your account or password.
              </Typography>
            </Box>

            <Box pt={2}>
              <Typography
                variant="h4"
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
              >
                2. Intellectual Property
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "8px 16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                a. The Portal and its original content, features, and
                functionality are owned by Refy and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property or proprietary rights laws.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                b. You may not copy, modify, distribute, transmit, display,
                reproduce, publish, license, create derivative works from,
                transfer, or sell any information, software, products, or
                services obtained from the Portal without Refy's prior written
                consent.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                c. You retain all intellectual property rights in the
                Confidential Information shared with Refy.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                d. Refy shall not acquire any intellectual property rights in
                the Confidential Information by virtue of these Terms or the
                provision of services to you.
              </Typography>
            </Box>

            <Box pt={2}>
              <Typography
                variant="h4"
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
              >
                3. Confidentiality
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "8px 16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                a. Any information you share with Refy through the Portal or
                other means of communication (hereinafter referred to as
                "Confidential Information") is sensitive and proprietary to you.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                b. Confidential Information shall include, but is not limited
                to, business or technical information, whether or not stored in
                any medium, relating to your business, equipment, software,
                designs, samples, technology, technical documentation, product
                or service specifications or strategies, marketing plans,
                pricing information, financial information, contracts,
                inventions, methodologies, and other know-how.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                c. Refy shall treat all Confidential Information as strictly
                confidential and shall not disclose such information to any
                third party without your prior written consent, except as
                required by law or court order.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                d. Refy shall use the Confidential Information solely for the
                purpose of providing services to you and shall not use it for
                any other purpose.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                e. Refy shall restrict disclosure of Confidential Information
                only to its employees, affiliates, agents, professional
                advisors, or authorized representatives who need to know for the
                purposes specified and who are bound by equivalent obligations
                as to confidentiality.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                f. Refy shall implement appropriate security measures to protect
                the Confidential Information from unauthorized access,
                disclosure, or misuse.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                g. The confidentiality obligations shall survive any termination
                or expiration of these Terms for a period of three (3) years
                from the date of disclosure.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                h. The confidentiality obligations shall not apply to
                information that: (a) is or becomes generally available to the
                public other than through any act or omission of Refy; (b) was
                lawfully in Refy's possession before the disclosure; (c) is
                lawfully obtained by Refy from a third party without any
                obligation of confidentiality; (d) is independently developed by
                Refy without reference to the Confidential Information; or (e)
                is required to be disclosed by law or court order, provided that
                Refy gives you prompt written notice of such requirement and
                cooperates with you to limit the scope of disclosure.
              </Typography>
            </Box>

            <Box pt={2}>
              <Typography
                variant="h4"
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
              >
                4. Intellectual Property
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "8px 16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                a. Refy shall process any personal data shared by you in
                accordance with applicable data protection laws and regulations,
                including the General Data Protection Regulation (GDPR) and the
                Personal Data Protection Act (PDPA) of Singapore.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                b. Refy shall maintain appropriate technical and organizational
                measures to ensure the security and confidentiality of personal
                data.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                c. Refy shall not transfer personal data to any third party
                without your consent, except as required by law or court order.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                d. You have the right to request access to, correction, or
                deletion of your personal data held by Refy, subject to
                applicable laws and regulations.
              </Typography>
            </Box>

            <Box pt={2}>
              <Typography
                variant="h4"
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
              >
                5. Limitation of Liability
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "8px 16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                a. The Portal is provided on an "as is" and "as available"
                basis. Refy makes no representations or warranties of any kind,
                express or implied, as to the operation of the Portal or the
                information, content, materials, or products included on the
                Portal.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                b. Refy shall not be liable for any indirect, incidental,
                special, or consequential damages arising out of or in
                connection with the use of the Portal or the services provided
                by Refy.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                c. Refy's total liability under these Terms shall not exceed the
                fees paid by you to Refy for the services provided.
              </Typography>
            </Box>
            <Box pt={2}>
              <Typography
                variant="h4"
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
              >
                6. Termination
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "8px 16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                a. Refy reserves the right to terminate or suspend your access
                to the Portal at any time, without prior notice or liability,
                for any reason whatsoever, including without limitation if you
                breach these Terms.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                b. Upon termination, Refy shall promptly return or destroy all
                Confidential Information received from you, except as required
                by law or court order.
              </Typography>
            </Box>

            <Box pt={2}>
              <Typography
                variant="h4"
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
              >
                7. Governing Law and Jurisdiction
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "8px 16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                a. These Terms shall be governed by and construed in accordance
                with the laws of Singapore.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                b. Any disputes arising out of or in connection with these Terms
                shall be subject to the exclusive jurisdiction of the courts of
                Singapore.
              </Typography>
            </Box>

            <Box pt={2}>
              <Typography
                variant="h4"
                sx={{ color: "#12190F", fontWeight: "700", fontSize: "18px" }}
              >
                8. Changes to the Terms
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "8px 16px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                a. Refy reserves the right, at its sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will provide at least 30 days' notice prior to any new terms
                taking effect.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "#9C9C9C", fontWeight: "500", fontSize: "16px" }}
              >
                b. By continuing to access or use the Portal after any revisions
                become effective, you agree to be bound by the revised Terms.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Box sx={{ padding: "16px" }}>
            If you have any questions about these Terms, please contact us at {" "}
  <Link href="mailto:data@refycap.com" underline="hover">
    data@refycap.com
  </Link>
  .
          </Box>
        </DialogActions>
      </BootstrapDialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          height: "calc(100vh - 90px)",
          width: "100%",
          overflowY: "auto",

        }}
      >
        <CssBaseline />
        <Box sx={{ display: "flex", width: "100%", alignItems: "center",  height: "calc(100vh - 90px)", }}>
          <Box
            sx={{
              height: "400px",
              width: "40%",
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <img src={data_secure} height="400px" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: { xs: "100%", md: "80%" },
             
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                pl: 4,
                pr: { md: 5, xs: 1 },
                
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
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    pt: 10,
                  }}
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
                    Sustainability-Linked Project Financing
                  </Typography>
                  <Typography
                    component="p"
                    variant="p"
                    sx={{
                      color: "#ABABAB",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      fontFamily: "Satoshi-Light",
                      letterSpacing: "0.8px",
                    }}
                  >
                    Welcome to our Capital Raising platform! We're excited to
                    learn more about your sustainability-linked projects and
                    help you identify the most suitable financing options.
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component="h4"
                    variant="h4"
                    sx={{
                      color: "#000000",
                      fontSize: "18px",
                      fontWeight: "700",
                      fontFamily: "Satoshi-Regular",
                      lineHeight: "32px",
                    }}
                  >
                    Getting Started
                  </Typography>
                  <Box>
                    <Typography
                      component="p"
                      variant="p"
                      sx={{
                        color: "#ABABAB",
                        fontSize: "14px",
                        fontWeight: "500",
                        width: "100%",
                        fontFamily: "Satoshi-Regular",
                        letterSpacing: "0.8px",
                      }}
                    >
                      At Refy, we understand that the information you share with
                      us is sensitive and confidential. We want to assure you
                      that we take your privacy and the security of your data
                      very seriously. To ensure that we can provide you with the
                      best possible service and protect your interests, we
                      kindly ask you to review and accept our Terms and
                      Conditions. These Terms and Conditions outline how we
                      handle your information, our commitments to
                      confidentiality, and the measures we take to safeguard
                      your data. By accepting our Terms and Conditions, you can
                      have peace of mind knowing that:
                    </Typography>
                    <ul>
                      <li
                        style={{
                          color: "#ABABAB",
                          fontSize: "14px",
                          fontWeight: "500",
                          width: "100%",
                          fontFamily: "Satoshi-Regular",
                          letterSpacing: "0.8px",
                        }}
                      >
                        {" "}
                        Your information will be treated as strictly
                        confidential and will only be used for the purposes
                        discussed.
                      </li>
                      <li
                        style={{
                          color: "#ABABAB",
                          fontSize: "14px",
                          fontWeight: "500",
                          width: "100%",
                          fontFamily: "Satoshi-Regular",
                          letterSpacing: "0.8px",
                        }}
                      >
                        We will not disclose your information to any third party
                        without your consent, except as required by law.
                      </li>
                      <li
                        style={{
                          color: "#ABABAB",
                          fontSize: "14px",
                          fontWeight: "500",
                          width: "100%",
                          fontFamily: "Satoshi-Regular",
                          letterSpacing: "0.8px",
                        }}
                      >
                        We will implement appropriate security measures to
                        protect your data from unauthorized access or
                        disclosure.
                      </li>
                      <li
                        style={{
                          color: "#ABABAB",
                          fontSize: "14px",
                          fontWeight: "500",
                          width: "100%",
                          fontFamily: "Satoshi-Regular",
                          letterSpacing: "0.8px",
                        }}
                      >
                        Our team is committed to maintaining the highest
                        standards of professionalism and integrity in handling
                        your information.
                      </li>
                    </ul>
                    <Typography
                      component="p"
                      variant="p"
                      sx={{
                        color: "#ABABAB",
                        fontSize: "12px",
                        fontWeight: "500",
                        width: "70%",
                        fontFamily: "Satoshi-Regular",
                        letterSpacing: "0.8px",
                      }}
                    >
                      To proceed, please take a moment to review our Terms and
                      Conditions and click the checkbox below to indicate your
                      acceptance.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        checked={termnCond}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <Box>
                        {" "}
                        <Typography
                          component="p"
                          variant="span"
                          sx={{
                            color: "#ABABAB",
                            fontSize: "14px",
                            fontWeight: "600",

                            lineHeight: "18px",
                            fontFamily: "Satoshi-Light",
                            letterSpacing: "0.8px",
                          }}
                        >
                          I have read and accept the Refy
                        </Typography>
                      </Box>

                      <Box onClick={showTnCDiv}>
                        {" "}
                        <Typography
                          component="p"
                          variant="p"
                          sx={{
                            color: "#387BE0",
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "18px",
                            fontFamily: "Satoshi-Light",
                            letterSpacing: "0.8px",
                            paddingLeft: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Terms and Conditions.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!termnCond}
                  sx={{
                    textTransform: "capitalize",
                    width: { xs: "90%", md: "50%" },
                    mt: 0,
                    mb: 2,
                    height: "52px",

                    fontSize: "18px",
                  }}
                  onClick={() => termAndConditions()}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
