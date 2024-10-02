import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATH_LOGIN, PATH_PROJECTS } from "../../commons/middleware/paths";
import PageLogin from "../PageLogin";
import PageProjects from "../PageProjects";

export default function Pages() {
  return (
    <Box id="container__root">
      <BrowserRouter>
        <Routes>
          <Route path={PATH_LOGIN} Component={PageLogin} />
          <Route path={PATH_PROJECTS} Component={PageProjects} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
