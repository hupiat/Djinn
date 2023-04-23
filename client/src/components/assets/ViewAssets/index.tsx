import React, { Suspense, useEffect } from "react";
import { Loader } from "rsuite";
import { useStoreDataAssets } from "../../../commons/middleware/hooks.tsx";
import CardAsset from "../CardAsset/index.tsx";

export default function ViewAssets() {
  const [data, store] = useStoreDataAssets();

  return (
    <Suspense fallback={<Loader />}>
      {data?.map((asset) => (
        <CardAsset key={asset.id} asset={asset} />
      ))}
    </Suspense>
  );
}
