import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import "./styles.css";
import { PATH_PROJECTS } from "../../commons/middleware/paths";
import { Map } from "@mui/icons-material";

export default function Sidebar() {
  const [selected, setSelected] = useState<number>(0);

  const renderItem = (
    title: string,
    path: string,
    icon: JSX.Element,
    index: number
  ) => {
    return (
      <ListItemButton
        selected={index === selected}
        onClick={() => {
          setSelected(index);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    );
  };

  return (
    <Box id="sidebar__container">
      <List>{renderItem("Projects", PATH_PROJECTS, <Map />, 0)}</List>
    </Box>
  );
}
