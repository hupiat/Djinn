import React from "react";
import Navbar from "../Navbar";
import { Card } from "@mui/material";
import InputLinkedinImport from "../forms/InputLinkedinImport";
import "./styles.css";
import { useRedirectToLogin } from "../../commons/hooks";

export default function PageSettings() {
  useRedirectToLogin();

  return (
    <>
      <Navbar />
      <Card id="settings__container">
        <InputLinkedinImport
          onFetch={console.log}
          containerClassName="settings__linkedin__input"
          placeholder="Import your profile..."
          helperText="Enter your profile URL"
        />
      </Card>
    </>
  );
}
