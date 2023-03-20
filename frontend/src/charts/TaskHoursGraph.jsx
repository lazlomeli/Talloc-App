import React from "react";
import * as taskAPI from "../services/taskService";
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

export const TaskHoursGraph = ({
  userSession,
  tasks,
  setTasks,
  selectedLanguage,
}) => {
  const totalTasksOfLang = taskAPI.countLanguageTasks(tasks, selectedLanguage);
  const hoursOfTasks = taskAPI.getHoursArrayOfEachTask(tasks, selectedLanguage);
  const arrayOfLangHours = [...Array(totalTasksOfLang).keys()];

  console.log(selectedLanguage);

  return (
    <>
      {selectedLanguage !== "Select a language" ? (
        <div className="trackerHoursGraph">
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
        </div>
      ) : (
        <div className="trackerHoursGraph-closed" />
      )}
    </>
  );
};
