import { Box, FormControl, TextField, TextFieldProps } from "@mui/material";
import React from "react";

type IProps = TextFieldProps & {
  icon: JSX.Element;
  containerClassName?: string;
};

export default function InputFormStandard(props: IProps) {
  return (
    <FormControl className={props.containerClassName}>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Box sx={{ color: "action.active", mr: 1, my: 0.5 }}>{props.icon}</Box>
        <TextField {...props} variant="standard" />
      </Box>
    </FormControl>
  );
}
