import React, { useState, useEffect } from "react";
import * as taskAPI from "../services/taskService";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import chartColors from "../../colors.json";

ChartJS.register(ArcElement, Tooltip);

function changeOpacity(colors, opacity) {
  chartColors.forEach((color) => {
    let newColor = color.replace("opc", opacity);
    colors.push(newColor);
  });
}

export const OverallPie = ({ userSession, tasks, setTasks }) => {
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
  const backgroundColors = [];
  const borderColors = [];

  changeOpacity(backgroundColors, "0.2");
  changeOpacity(borderColors, "1");

  return (
    <Doughnut
      data={{
        labels: programmingLanguages,
        datasets: [
          {
            label: "Created tasks",
            data: numberOfTasks,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
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
