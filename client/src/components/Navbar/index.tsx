import { Box, Button, Card, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.webp";
import { ExitToApp, HistoryEdu, Settings } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PATH_CV_LIST,
  PATH_LOGIN,
  PATH_SETTINGS,
} from "../../commons/middleware/paths";
import IconProfile from "../forms/IconProfile";
import { useMiddlewareContext } from "../../commons/middleware/context";
import { isMobile } from "../../commons/tools";

export default function Navbar() {
  const location = useLocation();
  const getTabIndexInitial = (): number => {
    switch (location.pathname) {
      case PATH_CV_LIST:
        return 0;
      case PATH_SETTINGS:
        return 1;
      default:
        return 0;
    }
  };

  const [tab, setTab] = useState<number>(getTabIndexInitial());
  const [anchorMenuProfile, setAnchorMenuProfile] =
    React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, setUser } = useMiddlewareContext();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    switch (newValue) {
      case 0:
        navigate(PATH_CV_LIST);
        break;
      case 1:
        navigate(PATH_SETTINGS);
        break;
    }
  };

  const handleMenuProfileClose = () => setAnchorMenuProfile(null);

  return (
    <Card id="navbar">
      <Box>
        <img src={Logo} alt="Logo" />
        <h1>Djinn</h1>
      </Box>
      <Box>
        <Tabs id="navbar__tabs" value={tab} onChange={handleChange}>
          <Tab
            label="My curriculums"
            icon={<HistoryEdu />}
            iconPosition="start"
            disabled={!user?.linkedin}
          />
          <Tab label="Settings" icon={<Settings />} iconPosition="start" />
        </Tabs>
        <Button
          id="navbar__profile"
          onClick={(e) => setAnchorMenuProfile(e.currentTarget)}
        >
          <IconProfile />
        </Button>
        <Menu
          id="navbar__profile__menu"
          open={anchorMenuProfile !== null}
          anchorEl={anchorMenuProfile}
          onClose={handleMenuProfileClose}
        >
          {isMobile() && (
            <MenuItem
              disabled={!user?.linkedin}
              onClick={() => {
                handleMenuProfileClose();
                navigate(PATH_CV_LIST);
              }}
            >
              <HistoryEdu /> Curriculums
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              handleMenuProfileClose();
              navigate(PATH_SETTINGS);
            }}
          >
            <Settings /> Settings
          </MenuItem>
          <MenuItem
            onClick={async () => {
              handleMenuProfileClose();
              await setUser(null);
              navigate(PATH_LOGIN);
            }}
          >
            <ExitToApp /> Logout
          </MenuItem>
        </Menu>
      </Box>
    </Card>
  );
}
