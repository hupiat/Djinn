import React from "react";
import PageLogin from "./components/PageLogin";
import { createTheme, ThemeProvider } from "@mui/material";
import MiddlewareContext from "./commons/middleware/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH_LOGIN } from "./commons/middleware/paths";

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
      <MiddlewareContext>
        <BrowserRouter>
          <Routes>
            <Route path={PATH_LOGIN} Component={PageLogin} />
          </Routes>
        </BrowserRouter>
      </MiddlewareContext>
    </ThemeProvider>
  );
}

export default App;
