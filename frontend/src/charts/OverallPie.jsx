import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import * as overallConfig from "./overallConfig";

ChartJS.register(ArcElement, Tooltip);

export const OverallPie = ({ tasks }) => {
  return (
    <Doughnut
      data={overallConfig.getChartData(tasks, 1, true)}
      height={300}
      width={300}
      options={overallConfig.pieOptions}
    />
  );
};
