import React from "react";
import InputFormStandard, {
  InputFormStandardProps,
} from "../InputFormStandard";
import { LinkedIn } from "@mui/icons-material";

type IProps = Omit<InputFormStandardProps, "icon">;

export default function InputLinkedinImport({ ...props }: IProps) {
  return <InputFormStandard icon={<LinkedIn />} {...props} />;
}
