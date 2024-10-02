import React from "react";
import Sidebar from "../Sidebar";
import { PATH_PROJECTS } from "../../commons/middleware/paths";
import ButtonUpload from "../forms/ButtonUpload";
import { Container } from "@mui/material";
import { useStoreDataProjects } from "../../commons/middleware/hooks";

export default function PageProjects() {
  const [data, storeDataProjects] = useStoreDataProjects();

  const handleUpload = async (file: File, fileEncoded: string) => {
    await storeDataProjects.add({
      name: file.name,
      file: fileEncoded,
    });
  };

  return (
    <>
      <Sidebar currentPath={PATH_PROJECTS} />
      <Container>
        <ButtonUpload onUpload={handleUpload} />
      </Container>
    </>
  );
}
