import React from "react";
import Navbar from "../Navbar";
import { Card } from "@mui/material";
import InputLinkedinImport from "../forms/InputLinkedinImport";
import "./styles.css";
import { useRedirectToLogin } from "../../commons/hooks";
import { CVInformation, CVPartFields } from "../../commons/types";
import { useMiddlewareContext } from "../../commons/middleware/context";

export default function PageSettings() {
  const { user, storeDataAccounts } = useMiddlewareContext();
  useRedirectToLogin();

  const handleImport = (informations: CVInformation[]) => {
    storeDataAccounts
      .update({
        ...user!,
        informations,
      })
      .then(console.log)
      .catch(console.error);
  };

  return (
    <>
      <Navbar />
      <Card id="settings__container">
        <InputLinkedinImport
          onFetch={handleImport}
          containerClassName="settings__linkedin__input"
          placeholder="Import your profile..."
          helperText="Enter your profile URL"
        />
      </Card>
    </>
  );
}
