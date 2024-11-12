import React, { useDeferredValue, useEffect, useState } from "react";
import InputFormStandard, {
  InputFormStandardProps,
} from "../InputFormStandard";
import { LinkedIn } from "@mui/icons-material";
import { useMiddlewareContext } from "../../../commons/middleware/context";
import { UNIPILE_API_KEY } from "../../../_local_constants";
import { CVInformation } from "../../../commons/types";

type IProps = Omit<InputFormStandardProps, "icon"> & {
  onFetch: (informations: CVInformation) => void;
};

export default function InputLinkedinImport({ onFetch, ...props }: IProps) {
  const { user, setUserState, storeDataAccounts } = useMiddlewareContext();
  const [value, setValue] = useState<string>(user?.linkedin || "");

  const [error, setError] = useState<boolean>(!user?.linkedin);
  const deferredValue = useDeferredValue(value);

  useEffect(() => {
    if (deferredValue) {
      fetch(
        "https://api9.unipile.com:13939/api/v1/users/" +
          deferredValue +
          "?account_id=dsJysQVoRQSIUz9u7r6L-w&linkedin_sections=%2A",
        {
          headers: {
            "X-API-KEY": UNIPILE_API_KEY,
            accept: "application/json",
            "content-type": "multipart/form-data",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setError(false);
          onFetch(res);
          const newUser = {
            ...user!,
            linkedin: deferredValue,
          };
          storeDataAccounts
            .update(newUser)
            .then(() => setUserState(newUser))
            .catch(console.error);
        })
        .catch(() => setError(true));
    }
  }, [deferredValue]);

  return (
    <InputFormStandard
      value={value}
      onChange={(e) => setValue(e.target.value)}
      icon={<LinkedIn />}
      error={error}
      {...props}
    />
  );
}
