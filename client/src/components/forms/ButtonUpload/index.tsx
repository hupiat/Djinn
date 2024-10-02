import { CloudUpload } from "@mui/icons-material";
import { ButtonProps } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ButtonWithAction from "../ButtonWithAction";
import { arrayBufferToBase64 } from "../../../commons/tools";

type IProps = {
  onUpload: (file: File, fileEncoded: string) => void;
  text?: string;
  color?: "primary" | "secondary";
} & ButtonProps;

export default function ButtonUpload({
  text = "Upload file",
  color = "primary",
  onUpload,
  ...props
}: IProps) {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (file) {
      file.arrayBuffer().then((buffer) => {
        onUpload(file, arrayBufferToBase64(buffer));
      });
    }
  }, [file]);

  return (
    <ButtonWithAction
      component="label"
      onClick={handleClick}
      text={
        <>
          {file ? file.name : text}
          <input
            type="file"
            accept=".zip, .7z, .tar"
            ref={inputRef}
            style={{ visibility: "hidden" }}
            onChange={async (e) => setFile(e.target.files![0])}
          />
        </>
      }
      color={color}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}
      {...(props as any)}
    />
  );
}
