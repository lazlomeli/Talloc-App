import React, { useState } from "react";
import { TaskHoursGraph } from "./TaskHoursGraph";
import { HexagonIcon } from "../icon_components/HexagonIcon";
import { TaskMoreInfo } from "../TaskMoreInfo";
import * as taskAPI from "../../src/services/taskService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const HoursLineGraph = ({ userSession, tasks, setTasks }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Select a language");
  const [highestTask, setHighestTask] = useState({});
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [openInightsModal, setOpenInsightsModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);

  const selectionArray = tasks.map((task) => task.programming_language);
  selectionArray.unshift("Select a language");
  const uniqueLangs = new Set(selectionArray);

  return (
    <section className="trackerHours">
      <section className="trackerHours_LangSelect">
        <div className="trackerHoursTitle">
          <HexagonIcon />
          <p className="trackerHours_Desc">Hours graph per language</p>
        </div>
        <select
          value={selectedLanguage}
          className="trackerHoursSelect"
          onChange={(e) => {
            if (e.target.value !== "Select a language") {
              setSelectedLanguage(e.target.value);
              setHighestTask(
                taskAPI.getHighestHoursTask(tasks, e.target.value)
              );
            }
          }}
        >
          {Array.from(uniqueLangs).map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
        <TaskHoursGraph
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
                <span className="trackerHoursLbl2">
                  {
                    taskAPI.getHighestHoursTask(tasks, selectedLanguage)
                      .time_spent
                  }{" "}
                  hours
                </span>
              </p>
              <button
                className="viewDetailsButton"
                onClick={() => setOpenMoreModal(true)}
              >
                View task
              </button>
            </div>
            <p className="trackerHoursMoreInfoLbl">
              Number of tasks:{"  "}
              <span className="trackerHoursLbl2">
                {taskAPI.countLanguageTasks(tasks, selectedLanguage)}
              </span>
            </p>
            <p className="trackerHoursMoreInfoLbl">
              Total hours spent in {selectedLanguage}:{"  "}
              <span className="trackerHoursLbl2">
                {taskAPI.getLanguageTotalHours(tasks, selectedLanguage)}
                {"  "}
                hours
              </span>
            </p>
          </div>
        </section>
      )}
      <TaskMoreInfo
        openMoreModal={openMoreModal}
        setOpenInsightsModal={setOpenInsightsModal}
        closeMoreModal={() => setOpenMoreModal(false)}
        persistedTask={highestTask}
        tasks={tasks}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        timeSpent={timeSpent}
        setTimeSpent={setTimeSpent}
      />
    </section>
  );
};
