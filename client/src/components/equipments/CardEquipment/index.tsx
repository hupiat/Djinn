import React from "react";
import { Equipment } from "../../../commons/types";
import { Panel, Placeholder } from "rsuite";

interface IProps {
  equipment: Equipment;
}

export default function CardEquipment({ equipment }: IProps) {
  return (
    <Panel bordered header={equipment.name}>
      <p>{equipment.description}</p>
      <p>{equipment.attributes.toString()}</p>
    </Panel>
  );
}
