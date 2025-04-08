import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E48312",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          "& fieldset": {
            borderWidth: "2px",
            borderColor: "#ccc",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#999",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
