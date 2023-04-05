import { BarLineChart, Treemap, Trend, Visible } from "@rsuite/icons";
import React from "react";
import { Stack } from "rsuite";
import BoardTilt from "./BoardTilt";

export default function Dashboard() {
  return (
    <Stack wrap>
      <Stack.Item>
        <BoardTilt title="Equipments" logo={<Treemap />} />
      </Stack.Item>
      <Stack.Item>
        <BoardTilt title="Monitoring" logo={<Visible />} />
      </Stack.Item>
      <Stack.Item>
        <BoardTilt title="Analytics" logo={<Trend />} />
      </Stack.Item>
    </Stack>
  );
}
