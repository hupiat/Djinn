import { Box, Card, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.webp";
import { HistoryEdu, Settings } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH_CV_LIST, PATH_SETTINGS } from "../../commons/middleware/paths";

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
  const navigate = useNavigate();

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

  return (
    <Card id="navbar">
      <Box>
        <img src={Logo} alt="Logo" />
        <h1>Djinn</h1>
      </Box>
      <Tabs value={tab} onChange={handleChange}>
        <Tab
          label="My curriculums"
          icon={<HistoryEdu />}
          iconPosition="start"
        />
        <Tab label="Settings" icon={<Settings />} iconPosition="start" />
      </Tabs>
    </Card>
  );
}
