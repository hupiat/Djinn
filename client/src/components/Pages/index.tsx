import React from "react";
import { useMiddlewareContext } from "../../commons/middleware/context";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATH_LOGIN, PATH_PROJECTS } from "../../commons/middleware/paths";
import PageLogin from "../PageLogin";
import Sidebar from "../Sidebar";
import PageProjects from "../PageProjects";

export default function Pages() {
  const { user } = useMiddlewareContext();
  console.log(user);
  return (
    <Box id="container__root">
      {!!user && <Sidebar />}
      <BrowserRouter>
        <Routes>
          <Route path={PATH_LOGIN} Component={PageLogin} />
          <Route path={PATH_PROJECTS} Component={PageProjects} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
