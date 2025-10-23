import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import upload from "../../../assets/upload.svg";
import { useSelector, useDispatch } from "react-redux";
import * as projectActions from "../../../store/project";
import doc from "../../../assets/doc.svg";
import delt from "../../../assets/delete.svg";

function UploadDocuments(props) {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleFile = (file) => {
    setFileName(file.name);
  };
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    event.stopPropagation();

    const file = event.target.files[0];
    setFileName(event.target.files[0].name);
    uploadFiles(file);
    setSelectedFile(file);
    // Here you can add logic to handle the selected file
    // For example, you can upload it to a server.
  };

  const handleIconClick = (e) => {
    console.log("handleIconClick");
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const uploadFiles = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `project2/${file.name}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadUrl) => {
        // uploadComplete(downloadUrl);
        props?.setUrl(downloadUrl);
      });
  };

  const uploadComplete = async (url) => {
    const project = await dispatch(projectActions.fileUploadSucces(url));
  };

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  // const uploadFiles = (file) => {
  //   const storage = getStorage();
  //   debugger
  //   const storageRef = ref(storage, `project1/${file.name}`);
  //   //
  //   uploadBytes(storageRef, file).then((snapshot) => {
  //     console.log("Uploaded a blob or file!");
  //   });

  //   getDownloadURL(storageRef).then( (url) =>{
  //     console.log('url',url);
  //   })

  // };

  return (
    <Box sx={{ pt: 3 }}>
      <CssBaseline />
      <Box>
        <Typography
          variant="h4"
          sx={{ color: "#12190F", fontSize: "18px", fontWeight: "700" }}
        >
          {" "}
          Upload your document to analyse
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#ABABAB", fontSize: "14px", fontWeight: "500" }}
        >
          {" "}
          You can upload any existing presentation or documentation on the project in lieu of filling out the project description. Please note that only PowerPoint or Google Slide presentations, or PDFs made from them, will be accepted. PDFs made from scanned images would not qualify.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          border: "dashed 2px #BCBCBC",
          borderSpacing: "8px",
          borderWidth: "1px",

          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            cursor: "pointer",
          }}
        >
          <button
            onClick={handleIconClick}
            style={{
              cursor: "pointer",
              border: "0",
              backgroundColor: "#fff",
            }}
          >
            {/* You can replace the icon with any icon library or custom SVG */}
            <img src={upload} alt="Upload" height="32px" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              lineHeight: "32px",
              color: "#008080",
              fontWeight: "600",
            }}
          >
            Click to upload
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "14px",
              lineHeight: "24px",
              color: "#808080",
            }}
          >
            Supported format : PDF, PPT, Word, Keynote
          </Typography>
        </Box>
      </Box>

      {selectedFile && (
        <Box
          sx={{
            width: "100%",
            height: "68px",
            borderRadius: "8px",
            border: "1px solid #d8d8d8",
            padding: "8px",
            marginTop:"16px"
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:'center',padding:"8px 14px"}}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems:"center" }}>
              <Box>
                <img src={doc} heigh="32px" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0px 16px ",
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
                  <a href={url} style={{textDecoration:"none", color:"#12190F"}}>{fileName}</a>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#9C9C9C",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                ></Typography>
              </Box>
            </Box>
            <Box>
              <img src={delt} heigh="32px" />
            </Box>
          </Box>
        </Box>
      )}
      {/* 
      <form onSubmit={handleFileInputChange}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form> */}
    </Box>
  );
}

export default UploadDocuments;
