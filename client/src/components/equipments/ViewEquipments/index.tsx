import React, { useEffect } from "react";
import { Loader } from "rsuite";
import { useStoreDataEquipments } from "../../../commons/middleware/hooks.tsx";

export default function ViewEquipments() {
  const [data, store] = useStoreDataEquipments();

  return <></>;
}
