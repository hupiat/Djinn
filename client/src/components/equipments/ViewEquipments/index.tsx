import React, { Suspense, useEffect } from "react";
import { Loader } from "rsuite";
import { useStoreDataEquipments } from "../../../commons/fetch/hooks.js";

export default function ViewEquipments() {
  const [data, store] = useStoreDataEquipments();

  useEffect(() => {
    store.fetch();
  }, []);

  console.log(data);

  return <Suspense fallback={<Loader />}></Suspense>;
}
