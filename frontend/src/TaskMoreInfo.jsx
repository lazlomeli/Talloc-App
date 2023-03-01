import React, { useState, useEffect } from "react";
import { GitLogoIcon } from "./icon_components/GitHubLogoIcon";
import CrossIcon from "./icon_components/CrossIcon";
import { PlusIcon } from "./icon_components/PlusIcon";
import * as taskAPI from "./services/taskService";

export const TaskMoreInfo = ({
  setOpenInsightsModal,
  openMoreModal,
  closeMoreModal,
  persistedTask,
  tasks,
  setTasks,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  timeSpent,
  setTimeSpent,
}) => {
  const [addHours, setAddHours] = useState(0);

  useEffect(() => {
    setTaskTitle(persistedTask.title);
    setTaskDescription(persistedTask.description);
    setTimeSpent(persistedTask.time_spent);
  }, [openMoreModal]);

  const taskToUpdate = {
    id: persistedTask.id,
    title: taskTitle,
    programming_language: persistedTask.programming_language,
    description: taskDescription,
    start_date: persistedTask.start_date,
    end_date: persistedTask.end_date,
    status: persistedTask.status,
    created_by: persistedTask.created_by,
    repository_name: persistedTask.repository_name,
    time_spent: timeSpent,
  };

  const updateTask = (task, id) => {
    taskAPI.updateTask(task.id, task).then((resp) => {
      setTasks([
        ...tasks.filter((task) => (task.id === id ? false : true)),
        resp.data,
      ]);
    });
    closeMoreModal();
  };

  if (!openMoreModal) return null;
  return (
    <>
      <div
        onClick={() => {
          closeMoreModal();
          setOpenInsightsModal(true);
        }}
        className="overlay"
      />
      <div className="taskMoreInfoModal">
        <CrossIcon
          toggleModal={closeMoreModal}
          setOpenInsightsModal={setOpenInsightsModal}
        />
        <div className="taskMoreInfoTop">
          <div className="taskMoreInfoTopLeft">
            {persistedTask.programming_language === "C#" ? (
              <img className="moreInfoLogo" src={`../static/csharp.png`}></img>
            ) : (
              <img
                className="moreInfoLogo"
                src={`../static/${persistedTask.programming_language}.png`}
              ></img>
            )}
            <h1 className="moreInfoTitle">
              {persistedTask.programming_language} Task
            </h1>
            <p className="moreInfoDesc">You can update the task here</p>
          </div>
          <div className="taskMoreInfoTopRight">
            <p className="moreInfoDesc">This task is currently:</p>
            {persistedTask.status === "COMPLETED" ? (
              <p className="moreInfoStatus" style={{ color: "#00c5a1" }}>
                {persistedTask.status}
              </p>
            ) : (
              <p className="moreInfoStatus" style={{ color: "#db5572" }}>
                {persistedTask.status}
              </p>
            )}
          </div>
        </div>
        <div className="moreInfoLine" />
        <div className="taskMoreInfoMid">
          <div className="taskMoreInfoMidLeft">
            <label className="moreInfoMidTitle">
              Task Title:
              {persistedTask.status === "COMPLETED" ? (
                <input
                  className="moreInfoMidLeftTitleInp"
                  type="text"
                  value={taskTitle || ""}
                  spellCheck="false"
                  readOnly
                />
              ) : (
                <input
                  className="moreInfoMidLeftTitleInp"
                  type="text"
                  value={taskTitle || ""}
                  spellCheck="false"
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              )}
            </label>
            <label className="moreInfoMidLeftDesc">
              Task Description:
              {persistedTask.status === "COMPLETED" ? (
                <textarea
                  className="moreInfoMidLeftText"
                  spellCheck="false"
                  value={taskDescription || ""}
                  readOnly
                />
              ) : (
                <textarea
                  className="moreInfoMidLeftText"
                  spellCheck="false"
                  value={taskDescription || ""}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              )}
            </label>
            <p className="moreInfoMidLeftRepo">Repository:</p>
            <div className="moreInfoMidLeftGit">
              <GitLogoIcon color={"#00c5a1"} w={"25"} h={"25"} />
              <label className="midLeftGitName">
                {persistedTask.repository_name}
              </label>
            </div>
          </div>
          <div className="taskMoreInfoMidRight">
            <div className="taskMoreInfoRightDates">
              <label className="moreInfoMidTitleRight">
                Start Date:
                <span
                  className="moreInfoMidTitleValue"
                  style={{ color: "#c2c6ca" }}
                >
                  {persistedTask.start_date}
                </span>
              </label>
              {persistedTask.end_date === "" ? (
                <label className="moreInfoMidTitleRight">
                  End Date:
                  <span
                    className="moreInfoMidTitleValue"
                    style={{ color: "#c2c6ca" }}
                  >
                    None
                  </span>
                </label>
              ) : (
                <label className="moreInfoMidTitleRight">
                  End Date:
                  <span
                    className="moreInfoMidTitleValue"
                    style={{ color: "#c2c6ca" }}
                  >
                    {persistedTask.end_date}
                  </span>
                </label>
              )}
            </div>
            <label className="moreInfoMidTitleRight_2">
              Hours spent:
              <div className="hoursSpentContainer">
                <div className="hoursSpentContainerLeft">
                  {persistedTask.time_spent === "" ? (
                    <label className="totalHours">0 hours</label>
                  ) : (
                    <label className="totalHours">{timeSpent} hours</label>
                  )}
                </div>
              </div>
            </label>
            {persistedTask.status === "ON GOING" && (
              <div className="hoursSpentContainerRight">
                <input
                  className="hoursSpentInput"
                  type="text"
                  placeholder="  0"
                  maxLength="2"
                  title="Add more hours"
                  value={addHours}
                  onChange={(e) => setAddHours(e.target.value)}
                />
                <PlusIcon
                  color={"#67717c"}
                  w={"25"}
                  h={"25"}
                  timeSpent={timeSpent}
                  setTimeSpent={setTimeSpent}
                  addHours={addHours}
                />
              </div>
            )}
            {persistedTask.status === "ON GOING" && (
              <div className="moreInfoRightButtonContainer">
                <button
                  className="taskMoreInfoRightUpdateButton"
                  onClick={() => {
                    updateTask(taskToUpdate, persistedTask.id);
                  }}
                >
                  Update task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
