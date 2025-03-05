import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }
    console.log(isSignUp ? "Signing up" : "Logging in", formData);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: 10 }}>
      <Header />
      <Typography variant="h3" gutterBottom style={{ fontWeight: "bold" }}>
        {isSignUp ? "Create account" : "Welcome back!"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          required
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
          error={passwordError}
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
