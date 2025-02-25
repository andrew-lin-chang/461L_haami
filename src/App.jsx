import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#808080",
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
