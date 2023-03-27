import React from "react";
import * as overallConfig from "./overallConfig";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, RadialLinearScale, Filler);

export const OverallRadar = ({ tasks }) => {
  return (
    <Radar
      data={overallConfig.getChartData(tasks, 2, true)}
      height={250}
      width={250}
      options={overallConfig.radarOptions}
    />
  );
};
