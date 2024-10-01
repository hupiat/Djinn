import React from "react";
import PageLogin from "./components/PageLogin";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6A1B9A",
      light: "#7B1FA2",
      dark: "#4A148C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#AD1457",
      light: "#C2185B",
      dark: "#880E4F",
      contrastText: "#FFFFFF",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageLogin />;
    </ThemeProvider>
  );
}

export default App;
