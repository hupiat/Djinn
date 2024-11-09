import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  PATH_CV_LIST,
  PATH_LOGIN,
  PATH_SETTINGS,
} from "../../commons/middleware/paths";
import PageLogin from "../PageLogin";
import PageCurriculumsList from "../PageCurriculumsList";
import PageSettings from "../PageSettings";

export default function Pages() {
  return (
    <Box id="container__root">
      <BrowserRouter>
        <Routes>
          <Route path={PATH_LOGIN} Component={PageLogin} />
          <Route path={PATH_CV_LIST} Component={PageCurriculumsList} />
          <Route path={PATH_SETTINGS} Component={PageSettings} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
