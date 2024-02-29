import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";

const data = [
  { value: 26, label: "Fast Food" },
  { value: 10, label: "Italian" },
  { value: 26, label: "Main Course" },
  { value: 9, label: "Starter" },
  { value: 12, label: "Beverages" },
  { value: 16, label: "Indian" },
  { value: 32, label: "Desert" },
  { value: 6, label: "Other" },
];

const size = {
  width: 600,
  height: 300,
};

export default function PieChartGraph() {
  return (
    <Box
      sx={{
        minWidth: "fit-content",
        width: "100%",
        background: "white",
        borderRadius: "6px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <PieChart
        colors={[
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#008FFB",
          "#00E396",
          "#FEB019",
        ]}
        series={[
          {
            arcLabelMinAngle: 45,
            data,
            innerRadius: 60,
            outerRadius: 100,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        {...size}
      />
    </Box>
  );
}
