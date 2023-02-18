import React from "react";
import { GitLogoIcon } from "./icon_components/GitHubLogoIcon";
import CrossIcon from "./icon_components/CrossIcon";
import { PlusIcon } from "./icon_components/PlusIcon";

export const TaskMoreInfo = ({
  openMoreModal,
  closeMoreModal,
  persistedTask,
  tasks,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  timeSpent,
  setTimeSpent,
}) => {
  if (!openMoreModal) return null;
  return (
    <>
      <div onClick={() => closeMoreModal()} className="overlay" />
      <div className="taskMoreInfoModal">
        <CrossIcon toggleModal={closeMoreModal} />
        <div className="taskMoreInfoTop">
          <div className="taskMoreInfoTopLeft">
            <img
              className="moreInfoLogo"
              src={`../static/${persistedTask.programming_language}.png`}
            ></img>
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
              <input
                className="moreInfoMidLeftTitleInp"
                type="text"
                defaultValue={persistedTask.title}
                spellCheck="false"
              />
            </label>
            <label className="moreInfoMidLeftDesc">
              Task Description:
              <textarea
                className="moreInfoMidLeftText"
                spellCheck="false"
                defaultValue={persistedTask.description}
              />
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
                  {" "}
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
                    style={{ color: "rgb(139, 139, 139)" }}
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
                    <label className="totalHours">
                      {persistedTask.time_spent} hours
                    </label>
                  )}
                </div>
              </div>
            </label>
            <div className="hoursSpentContainerRight">
              <input
                className="hoursSpentInput"
                type="text"
                placeholder="  0"
                maxLength="2"
                title="Add more hours"
              />
              <PlusIcon color={"#67717c"} w={"25"} h={"25"} />
            </div>
            <div className="moreInfoRightButtonContainer">
              <button
                className="taskMoreInfoRightUpdateButton"
                onClick={() => console.log("Hola")}
              >
                Update task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
