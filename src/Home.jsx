import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EastRoundedIcon from "@mui/icons-material/EastRounded";

function Header() {
  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        padding: "12px",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ fontWeight: "bold" }}
        >
          haami
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function Home() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Header />
      {/* This Toolbar acts as a spacer for the fixed header */}
      <Toolbar />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginTop: "20px" }}
      >
        Hardware at your fingertips.
      </Typography>
      <Typography gutterBottom sx={{ maxWidth: "600px", marginBottom: "20px" }}>
        This minimalist platform is designed to help you streamline your
        hardware projects, making it easier to manage your components and
        designs.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        endIcon={<EastRoundedIcon />}
        onClick={handleLoginRedirect}
        sx={{ margin: "12px", padding: "12px 24px", fontSize: "16px" }}
      >
        Get Started
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          marginTop: "60px",
        }}
      >
        <Box
          component="img"
          src="/breadboard.jpeg"
          sx={{ width: "auto", height: "250px", borderRadius: "16px" }}
        />
        <Box
          component="img"
          src="/spread.jpeg"
          sx={{ width: "auto", height: "200px", borderRadius: "16px" }}
        />
        <Box
          component="img"
          src="/pcb.jpeg"
          sx={{ width: "auto", height: "250px", borderRadius: "16px" }}
        />
        <Box
          component="img"
          src="/lab.jpg"
          sx={{ width: "auto", height: "200px", borderRadius: "16px" }}
        />
        <Box
          component="img"
          src="/pcbs.jpeg"
          sx={{ width: "auto", height: "250px", borderRadius: "16px" }}
        />
      </Box>
    </Container>
  );
}

export default Home;
