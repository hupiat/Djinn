import React from "react";
import { Asset } from "../../../commons/types";
import { Panel, Placeholder } from "rsuite";

interface IProps {
  asset: Asset;
}

export default function CardAsset({ asset }: IProps) {
  return (
    <Panel bordered header={asset.name}>
      <p>{asset.description}</p>
      <p>{asset.attributes.toString()}</p>
    </Panel>
  );
}
