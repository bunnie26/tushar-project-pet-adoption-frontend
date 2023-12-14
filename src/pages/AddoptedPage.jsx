import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box} from '@mui/material';
import { styled } from "@mui/material/styles";
import success from "../assets/success-gif.gif"
const GreenCheckIcon = styled(CheckCircleIcon)({
  color: "green",
  fontSize: 80,
});

const AdoptedPage = () => {
  return (
    <Box
      sx={{
        background: "#f1f1f1",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "75vh",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center",justifyContent:"center", alignItems:"center"}}>
        <img src={success} className="m-auto"/>
        <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
          Your adoption request has been approved!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          The pet owner will contact you soon.
        </Typography>
        {/* Add any additional content or styling as needed */}
      </Container>
    </Box>
  );
};

export default AdoptedPage;
