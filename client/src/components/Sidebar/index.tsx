import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import "./styles.css";
import { PATH_LOGIN, PATH_PROJECTS } from "../../commons/middleware/paths";
import { Logout, Map } from "@mui/icons-material";
import Logo from "../../assets/logo.webp";
import { useMiddlewareContext } from "../../commons/middleware/context";

export default function Sidebar() {
  const [selected, setSelected] = useState<number>(0);
  const { setUser } = useMiddlewareContext();

  const renderItem = (
    title: string,
    path: string,
    icon: JSX.Element,
    index: number,
    onClick?: () => void
  ) => {
    return (
      <ListItemButton
        selected={index === selected}
        onClick={() => {
          setSelected(index);
          onClick && onClick();
          // not using BrowserRouter here to build the
          // Sidebar above (better components manage flow)
          window.location.href = path;
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    );
  };

  return (
    <Box id="sidebar__container">
      <Box id="sidebar__top__container">
        <img src={Logo} alt="Logo Djinn" /> <h1>Djinn</h1>
      </Box>
      <List>{renderItem("Projects", PATH_PROJECTS, <Map />, 0)}</List>
      <List>
        {renderItem("Logout", PATH_LOGIN, <Logout />, 1, () => setUser(null))}
      </List>
    </Box>
  );
}
