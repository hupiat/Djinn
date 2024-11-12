import React from "react";
import Navbar from "../Navbar";
import { useRedirectToLogin } from "../../commons/hooks";

export default function PageCurriculumsList() {
  useRedirectToLogin();

  return (
    <>
      <Navbar />
    </>
  );
}
