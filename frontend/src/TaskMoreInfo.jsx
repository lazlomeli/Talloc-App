import React, { useState, useEffect, useContext } from "react";
import CrossIcon from "./icon_components/CrossIcon";
import { PlusIcon } from "./icon_components/PlusIcon";
import * as taskAPI from "./services/taskService";
import { Oval } from "react-loader-spinner";
import { GitRepoShield } from "./GitRepoShield";
import { MessagesContext } from "./services/MessagesContext";

export const TaskMoreInfo = ({
  userSession,
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
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const messages = useContext(MessagesContext);

  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

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
    taskAPI.updateTask(task.id, task, TASK_API_URL).then((resp) => {
      setTasks([
        ...tasks.filter((task) => (task.id === id ? false : true)),
        resp.data,
      ]);
      setTaskTitle(messages.UX.EMPTY_STRING);
      setTaskDescription(messages.UX.EMPTY_STRING);
      setTimeSpent(0);
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
            {persistedTask.programming_language === messages.UX.CSHARP ? (
              <img className="moreInfoLogo" src={`../static/csharp.png`}></img>
            ) : (
              <img
                className="moreInfoLogo"
                src={`../static/${persistedTask.programming_language}.png`.toLowerCase()}
              ></img>
            )}
            <h1 className="moreInfoTitle">
              {persistedTask.programming_language} Task
            </h1>
            <p className="moreInfoDesc">You can update the task here</p>
          </div>
          <div className="taskMoreInfoTopRight">
            <p className="moreInfoDesc">This task is currently:</p>
            {persistedTask.status === messages.TASK_INFO.STATUS.COMPLETED ? (
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
              {persistedTask.status === messages.TASK_INFO.STATUS.COMPLETED ? (
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
              {persistedTask.status === messages.TASK_INFO.STATUS.COMPLETED ? (
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
            <GitRepoShield
              userSession={userSession}
              repositoryName={persistedTask.repository_name}
            />
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
              {persistedTask.end_date === messages.UX.EMPTY_STRING ? (
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
                  {persistedTask.time_spent === messages.UX.EMPTY_STRING ? (
                    <label className="totalHours">0 hours</label>
                  ) : (
                    <label className="totalHours">{timeSpent} hours</label>
                  )}
                </div>
              </div>
            </label>
            {persistedTask.status === messages.TASK_INFO.STATUS.ON_GOING && (
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
            {persistedTask.status === messages.TASK_INFO.STATUS.ON_GOING && (
              <div className="moreInfoRightButtonContainer">
                <button
                  className="taskMoreInfoRightUpdateButton"
                  onClick={() => {
                    setLoadingVisibility(true);
                    setTimeout(() => {
                      updateTask(taskToUpdate, persistedTask.id);
                      setLoadingVisibility(false);
                    }, 500);
                  }}
                >
                  Update task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Oval
        height={80}
        width={80}
        color="#00a586"
        wrapperStyle={{}}
        wrapperClass="loadingSpinner"
        visible={loadingVisibility}
        ariaLabel="oval-loading"
        secondaryColor="#074b3e"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      {loadingVisibility && <div className="overlay" style={{ zIndex: 2 }} />}
    </>
  );
};
