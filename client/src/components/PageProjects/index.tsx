import React from "react";
import Sidebar from "../Sidebar";
import { PATH_PROJECTS } from "../../commons/middleware/paths";

export default function PageProjects() {
  return <Sidebar currentPath={PATH_PROJECTS} />;
}
