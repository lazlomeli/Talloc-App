import React, { useState, useContext } from "react";
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
import { MessagesContext } from "../services/MessagesContext";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

export const TaskHoursGraph = ({ tasks, selectedLanguage }) => {
  const totalTasksOfLang = taskAPI.countLanguageTasks(tasks, selectedLanguage);
  const hoursOfTasks = taskAPI.getHoursArrayOfEachTask(tasks, selectedLanguage);
  const arrayOfLangHours = [...Array(totalTasksOfLang).keys()];
  const [hoveredItem, setHoveredItem] = useState("");
  const messages = useContext(MessagesContext);

  return (
    <>
      {selectedLanguage !== messages.UX.SELECT_LANGUAGE ? (
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
              elements: {
                point: {
                  pointRadius: 5,
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    title: () => {
                      return `${selectedLanguage} tasks:`;
                    },
                    afterTitle: () => {
                      return "________________";
                    },
                    beforeBody: () => {
                      return " ";
                    },
                    label: () => {
                      return `Time spent: ${hoveredItem}h`;
                    },
                  },
                },
              },
              onHover: (event, item) => {
                if (item.length) {
                  setHoveredItem(item[0].element.$context.raw);
                }
              },
            }}
          />
        </div>
      ) : (
        <div className="trackerHoursGraph-closed" />
      )}
    </>
  );
};
