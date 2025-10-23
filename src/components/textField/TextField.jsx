import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import edit from "../../assets/edit.svg";

function TextField(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [details, setDetails] = useState(
    " "
  );
  useEffect(() => {
    // setDetails(props?.details);
    if (props?.edit) {
      setShowEdit(props?.edit);
      setDetails(props?.value)
    }
  }, [props?.details]);
  const handleChange = (e) => {
    setDetails(e.target.value);
  };
  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };
  return (
    <>
      <Box
        sx={{
          pt: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <label for="label">{props?.label}</label>

          {props?.edit && (
            <Box
              sx={{
                pb: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={toggleEdit}
            >
              <img src={edit} height="18px" />
              <Typography
                variant="h6"
                sx={{ color: "#008080", fontSize: "16px" }}
              >
                Edit
              </Typography>
            </Box>
          )}
        </Box>

        {!showEdit ? (
          <textarea
            style={{
              borderRadius: "6px",
              borderColor: "#ABABAB",
              padding: "16px",
              fontFamily: "Satoshi-Regular",
              height: "auto",
              fontSize: "18px",
              minHeight: "180px",
            }}
            type="text"
            id="textfield"
            name="textfield"
            placeholder={props?.placeholder ? props?.placeholder : "Enter here"}
            value={props?.value ? props?.value : details}
            onChange={props?.onChange ? props?.onChange:  handleChange}
          />
        ) : (
          <Box
            sx={{
              borderRadius: "6px",
              borderColor: "#ABABAB",
              border: "1px solid",
              padding: "16px",
              fontFamily: "Satoshi-Regular",
              color: "#9C9C9C",
              width: "100%",
              minHeight: "180px",
            }}
          >
            {details}
          </Box>
        )}
      </Box>
    </>
  );
}
export default TextField;
