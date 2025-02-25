import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignUp ? "Signing up" : "Logging in", formData);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: 50 }}>
      <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {isSignUp ? "Sign Up" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
        <Button
          color="seco"
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ marginTop: 10 }}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Button>
      </Paper>
    </Container>
  );
}
