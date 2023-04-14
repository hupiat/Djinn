import React, { Suspense, useEffect } from "react";
import { Loader } from "rsuite";
import { useStoreDataEquipments } from "../../../commons/middleware/hooks.tsx";
import CardEquipment from "../CardEquipment/index.tsx";

export default function ViewEquipments() {
  const [data, store] = useStoreDataEquipments();

  return (
    <Suspense fallback={<Loader />}>
      {data?.map((eq) => (
        <CardEquipment key={eq.id} equipment={eq} />
      ))}
    </Suspense>
  );
}
