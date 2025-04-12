import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

function Header() {
  const navigate = useNavigate();

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
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: "bold",
            "&:hover": {
              color: "#E48312",
            },
          }}
          onClick={() => navigate("/")}
        >
          haami
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ userid: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState({
    isError: false,
    message: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      let response;
      if (isSignUp) {
        response = await fetch(`${apiUrl}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        login(data.token, formData.userid);
        navigate("/dashboard");
      } else {
        console.error(data);
        setLoginError({ isError: true, message: data.message });
      }
    } catch (err) {
      setLoginError({
        isError: true,
        message: "Oopsie! A server error occurred",
      });
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: 10 }}>
      <Header />
      {/* {loginError.isError && (
        <Typography color="error" style={{ marginBottom: 10 }}>
          {loginError.message}
        </Typography>
      )} */}
      <Typography variant="h3" gutterBottom style={{ fontWeight: "bold" }}>
        {isSignUp ? "Create account" : "Welcome back!"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          name="userid"
          fullWidth
          value={formData.userid}
          onChange={handleChange}
          required
          error={loginError.isError}
          sx={{
            marginBottom: "12px",
          }}
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={formData.password}
          onChange={handleChange}
          required
          error={passwordError | loginError.isError}
          helperText={loginError.isError ? loginError.message : ""}
          sx={{
            marginBottom: "12px",
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {isSignUp && (
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={passwordError}
            helperText={passwordError ? "Passwords do not match" : ""}
            sx={{ marginBottom: "12px" }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ height: "56px", fontSize: "16px" }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
      </form>
      <Button onClick={() => setIsSignUp(!isSignUp)} style={{ marginTop: 10 }}>
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </Button>
    </Container>
  );
}
