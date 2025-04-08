import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "20%" }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
        HAAMI
      </Typography>
      <Typography variant="h5" gutterBottom>
        In development...
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoginRedirect}
        sx={{ margin: "12px", padding: "12px 24px", fontSize: "16px" }}
      >
        Get Started
      </Button>
    </Container>
  );
}

export default Home;
