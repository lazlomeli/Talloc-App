import * as taskAPI from "../services/taskService";
import chartColors from "../../colors.json";

const changeOpacity = (colors, opacity) => {
  chartColors.forEach((color) => {
    let newColor = color.replace("opc", opacity);
    colors.push(newColor);
  });
};

const backgroundColors = [];
const borderColors = [];

changeOpacity(backgroundColors, "0.2");
changeOpacity(borderColors, "1");

export const createTasksMap = (tasks) => {
  const tasksMap = new Map();

  for (let i = 0; i < tasks.length; i++) {
    tasksMap.set(
      taskAPI.getLanguages(tasks)[i],
      taskAPI.countLanguageTasks(tasks, taskAPI.getLanguages(tasks)[i])
    );
    tasksMap.delete(undefined);
  }

  return tasksMap;
};

export const getChartData = (tasks, borderWidth, fill) => {
  const tasksMap = createTasksMap(tasks);
  const data = {
    labels: Array.from(tasksMap.keys()),
    datasets: [
      {
        label: "Created tasks",
        data: Array.from(tasksMap.values()),
        fill: fill,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: borderWidth,
      },
    ],
  };
  return data;
};
export const radarOptions = {
  elements: {
    point: {
      pointRadius: 5,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      padding: 10,
      callbacks: {
        afterTitle: (c) => {
          return "_______________";
        },
        beforeBody: (c) => {
          return " ";
        },
      },
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      ticks: {
        display: false,
      },
      grid: {
        color: "#353941",
      },
      angleLines: {
        color: "#353941",
      },
    },
  },
};

export const pieOptions = {
  plugins: {
    tooltip: {
      enabled: true,
      padding: 10,
      callbacks: {
        afterTitle: (c) => {
          return "_______________";
        },
        beforeBody: (c) => {
          return "               ";
        },
      },
    },
  },
};
