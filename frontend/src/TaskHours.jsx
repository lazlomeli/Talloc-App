import React from "react";
import * as taskAPI from "../src/services/taskService";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

export const TaskHours = ({
  userSession,
  tasks,
  setTasks,
  selectedLanguage,
}) => {
  const totalTasksOfLang = taskAPI.countLanguageTasks(tasks, selectedLanguage);
  const hoursOfTasks = taskAPI.getHoursArrayOfEachTask(tasks, selectedLanguage);
  const arrayOfLangHours = [...Array(totalTasksOfLang).keys()];

  return (
    <div className="trackerHoursGraph">
      {selectedLanguage !== "Select a language" && (
        <Line
          data={{
            labels: arrayOfLangHours,
            datasets: [
              {
                label: selectedLanguage,
                data: hoursOfTasks,
                fill: false,
                borderColor: "#00a586",
                tension: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {},
          }}
        />
      )}
    </div>
  );
};
