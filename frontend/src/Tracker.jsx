import React, { useState, useEffect } from "react";
import { OverallPie } from "./charts/OverallPie";
import DashboardSideBar from "./DashboardSideBar";
import DashboardTopBar from "./DashboardTopBar";
import * as taskAPI from "../src/services/taskService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { TaskHours } from "./TaskHours";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Tracker = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("Select a language");

  useEffect(() => {
    taskAPI.getUserTasks(userSession).then((resp) => setTasks(resp.data));
  }, []);

  const userSession = localStorage.getItem("talloc_username");
  const selectionArray = tasks.map((task) => task.programming_language);
  selectionArray.unshift("Select a language");
  const uniqueLangs = new Set(selectionArray);

  taskAPI.getHighestHoursTask(tasks, "TypeScript");

  return (
    <section className="dashboardPage">
      <DashboardTopBar />
      <DashboardSideBar />
      <section className="trackerPanel">
        <section className="mainTracker">
          <section className="trackerHours">
            <section className="trackerHours_LangSelect">
              <h1 className="statsTitle">Tracker Statistics</h1>
              <p className="trackerHours_Desc">Hours graph per language</p>
              <select
                value={selectedLanguage}
                className="trackerHoursSelect"
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {Array.from(uniqueLangs).map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
              <TaskHours
                userSession={userSession}
                tasks={tasks}
                setTasks={setTasks}
                selectedLanguage={selectedLanguage}
              />
            </section>
            {selectedLanguage !== "Select a language" && (
              <section className="trackerHoursInfo">
                <div className="trackerHoursInfoHeader">
                  <img
                    className="taskLangLogo"
                    src={`../static/${selectedLanguage}.png`}
                    style={{ marginLeft: 10, marginRight: 10 }}
                  />
                  <h1 className="trackerHoursTitle">
                    {selectedLanguage} tasks info:
                  </h1>
                </div>
                <div className="trackerHoursLine" />
                <div className="trackerHoursViewDetails">
                  <div className="trackerViewDetails">
                    <p className="trackerHoursMoreInfoLbl">
                      Task with more hours:{" "}
                      {taskAPI.getHighestHoursTask(tasks, selectedLanguage)}{" "}
                      hours
                    </p>
                    <button
                      className="viewDetailsButton"
                      onClick={() => console.log("Stuff")}
                    >
                      View task
                    </button>
                  </div>
                  <p className="trackerHoursMoreInfoLbl">
                    Number of tasks:{"  "}
                    {taskAPI.countLanguageTasks(tasks, selectedLanguage)}
                  </p>
                  <p className="trackerHoursMoreInfoLbl">
                    Total hours spent in {selectedLanguage}:{"  "}
                    {taskAPI.getLanguageTotalHours(tasks, selectedLanguage)}
                    {"  "}
                    hours
                  </p>
                </div>
              </section>
            )}
          </section>
        </section>
        <section className="trackerOverall">
          <h1 className="statsTitle">Overall Statistics</h1>
          <div className="overallLine"></div>
          <p className="overallDesc">
            This graph represents your overall statistics regarding the number
            of created tasks within Talloc
          </p>
          <div className="overallChart">
            <OverallPie
              userSession={userSession}
              tasks={tasks}
              setTasks={setTasks}
            />
          </div>
        </section>
      </section>
    </section>
  );
};
