import React, { useState, useEffect } from "react";
import * as taskAPI from "../services/taskService";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export const OverallPie = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskAPI.getUserTasks("lazlomeli").then((resp) => setTasks(resp.data));
  }, []);

  const tasksMap = new Map();

  for (let i = 0; i < tasks.length; i++) {
    tasksMap.set(
      taskAPI.getLanguages(tasks)[i],
      taskAPI.countLanguageTasks(tasks, taskAPI.getLanguages(tasks)[i])
    );
    tasksMap.delete(undefined);
  }

  const programmingLanguages = Array.from(tasksMap.keys());
  const numberOfTasks = Array.from(tasksMap.values());

  return (
    <Doughnut
      data={{
        labels: programmingLanguages,
        datasets: [
          {
            label: "Created tasks",
            data: numberOfTasks,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(43, 255, 213, 0.2)",
              "rgba(222, 115, 255, 0.2)",
              "rgba(73, 78, 242, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(43, 255, 213, 1)",
              "rgba(222, 115, 255, 1)",
              "rgba(73, 78, 242, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
      height={300}
      width={300}
      options={{
        legend: {
          display: false,
        },
      }}
    />
  );
};
