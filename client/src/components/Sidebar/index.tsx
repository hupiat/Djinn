import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import "./styles.css";
import { PATH_LOGIN, PATH_PROJECTS } from "../../commons/middleware/paths";
import { Logout, Map } from "@mui/icons-material";
import Logo from "../../assets/logo.webp";
import { useMiddlewareContext } from "../../commons/middleware/context";
import { useNavigate } from "react-router-dom";

interface IProps {
  currentPath: string;
}

export default function Sidebar({ currentPath }: IProps) {
  const { setUser } = useMiddlewareContext();
  const navigate = useNavigate();

  const renderItem = (
    title: string,
    path: string,
    icon: JSX.Element,
    onClick?: () => void | Promise<void>
  ) => {
    return (
      <ListItemButton
        selected={path === currentPath}
        onClick={async () => {
          onClick && (await onClick());
          navigate(path);
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
      <List>{renderItem("Projects", PATH_PROJECTS, <Map />)}</List>
      <List>
        {renderItem(
          "Logout",
          PATH_LOGIN,
          <Logout />,
          async () => await setUser(null)
        )}
      </List>
    </Box>
  );
}
