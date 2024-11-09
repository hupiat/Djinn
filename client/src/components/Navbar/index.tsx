import { Card } from "@mui/material";
import React from "react";
import "./styles.css";
import Logo from "../../assets/logo.webp";

export default function Navbar() {
  return (
    <Card id="navbar">
      <img src={Logo} alt="Logo" />
      <h1>Djinn CV Builder</h1>
    </Card>
  );
}
