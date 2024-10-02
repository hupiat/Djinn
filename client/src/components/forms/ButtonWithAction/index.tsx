import { Send } from "@mui/icons-material";
import { Box, Button, ButtonProps, CircularProgress } from "@mui/material";
import "./styles.css";
import React, { useState } from "react";

type IProps = ButtonProps & {
  text: string;
  onClick: () => void | Promise<void>;
  icon?: JSX.Element;
  iconPosition?: "start" | "end";
};

export default function ButtonWithAction(props: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    await props.onClick();
    setIsLoading(false);
  };

  const getIcon = () => {
    if (isLoading) {
      return <CircularProgress size={"1rem"} />;
    }
    if (props.icon) {
      return <Box>{props.icon}</Box>;
    } else {
      return <Send />;
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      className="button__action"
      endIcon={props.iconPosition === "end" && getIcon()}
      startIcon={
        (!props.iconPosition || props.iconPosition === "start") && getIcon()
      }
    >
      {props.text}
    </Button>
  );
}
