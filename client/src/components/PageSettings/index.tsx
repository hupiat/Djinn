import React from "react";
import Navbar from "../Navbar";
import { Card } from "@mui/material";
import InputLinkedinImport from "../forms/InputLinkedinImport";
import "./styles.css";

export default function PageSettings() {
  return (
    <>
      <Navbar />
      <Card id="settings__container">
        <InputLinkedinImport
          containerClassName="settings__linkedin__input"
          placeholder="Import your profile..."
          helperText="Enter your profile URL or linkedin username"
        />
      </Card>
    </>
  );
}
