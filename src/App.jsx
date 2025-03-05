import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Login";

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
    <ThemeProvider theme={theme}>
      <div>
        <Login />
      </div>
    </ThemeProvider>
  );
}

export default App;
