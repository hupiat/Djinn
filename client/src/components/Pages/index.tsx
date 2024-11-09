import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATH_LOGIN } from "../../commons/middleware/paths";
import PageLogin from "../PageLogin";

export default function Pages() {
  return (
    <Box id="container__root">
      <BrowserRouter>
        <Routes>
          <Route path={PATH_LOGIN} Component={PageLogin} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
