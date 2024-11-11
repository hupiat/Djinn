import { Face4 } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import "./styles.css";

interface IProps {
  picturePath?: string;
  size?: number;
  containerClassName?: string;
}

export default function IconProfile({
  picturePath,
  size = 32,
  containerClassName,
}: IProps) {
  const imageStyle = {
    width: size,
    height: size,
  };

  return (
    <Box className={containerClassName}>
      {picturePath ? (
        <img
          src={picturePath}
          alt="avatar"
          style={imageStyle}
          className="profile__picture"
        />
      ) : (
        <Face4 style={imageStyle} className="profile__picture" />
      )}
    </Box>
  );
}
