import React, { useContext } from "react";
import * as taskAPI from "../services/taskService";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MessagesContext } from "../services/MessagesContext";

ChartJS.register(BarElement, BarController, CategoryScale, Tooltip, Legend);

export const StatusBarChart = ({ tasks, setTasks }) => {
  const messages = useContext(MessagesContext);
  const completedTasksArr = taskAPI.getTasksByStatus(
    tasks,
    messages.TASK_INFO.STATUS.COMPLETED
  );
  const onGoingTasksArr = taskAPI.getTasksByStatus(
    tasks,
    messages.TASK_INFO.STATUS.ON_GOING
  );

  return (
    <Bar
      data={{
        labels: ["Completed & On Going tasks"],
        datasets: [
          {
            label: ["Completed"],
            data: [completedTasksArr.length],
            backgroundColor: ["#00a585"],
          },
          {
            label: ["On Going"],
            data: [onGoingTasksArr.length],
            backgroundColor: ["rgb(219, 85, 114)"],
          },
        ],
      }}
      width={500}
      height={250}
      options={{
        plugins: {
          legend: {
            display: true,
          },
        },
      }}
    />
  );
};
