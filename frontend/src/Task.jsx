import React, { useState, useContext } from "react";
import * as taskAPI from "./services/taskService";
import Moment from "moment";
import { TaskMoreInfo } from "./TaskMoreInfo";
import { ViewMoreIcon } from "./icon_components/ViewMoreIcon";
import { MessagesContext } from "./services/MessagesContext";

export const Task = ({
  userSession,
  tasks,
  setTasks,
  filterStatus,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  timeSpent,
  setTimeSpent,
}) => {
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [persistedTask, setPersistedTask] = useState({});
  const messages = useContext(MessagesContext);

  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

  const completeTask = (task) => {
    const newTask = {
      id: task.id,
      title: task.title,
      programming_language: task.programming_language,
      description: task.description,
      start_date: task.start_date,
      end_date: Moment().format(messages.DATE_FORMAT.ISO),
      status: messages.TASK_INFO.STATUS.COMPLETED,
      created_by: userSession,
      repository_name: task.repository_name,
      time_spent: task.time_spent,
    };

    taskAPI.updateTask(task.id, newTask, TASK_API_URL).then(() => {
      let updatedTasks = tasks.filter((t) =>
        t.id === newTask.id ? false : true
      );
      updatedTasks.push(newTask);
      setTasks(updatedTasks);
    });
  };

  const deleteTask = (id) => {
    taskAPI.deleteTaskByID(id, TASK_API_URL).then(() => {
      setTasks([...tasks.filter((task) => (task.id === id ? false : true))]);
    });
  };

  function goToRepos(repository) {
    try {
      window.open(`https://github.com/${userSession}/${repository}`);
    } catch (error) {
      errorModalHandler(messages.ERRORS.GENERIC);
    }
  }

  return (
    <>
      {tasks.map(
        (task) =>
          task.status === filterStatus && (
            <div key={task.id} className="task">
              <ViewMoreIcon
                color={"#78808a"}
                w={"25"}
                h={"25"}
                task={task}
                setOpenMoreModal={setOpenMoreModal}
                setPersistedTask={setPersistedTask}
              />
              {task.title.length <= 30 ? (
                <h1 title={task.title} className="taskTitle">
                  {task.title}
                </h1>
              ) : (
                <h1 title={task.title} className="taskTitle">
                  {task.title.substring(0, 30)}...
                </h1>
              )}
              <div className="taskLine" />
              {task.programming_language === messages.UX.CSHARP ? (
                <div className="taskLangContainer">
                  <img className="taskLangLogo" src={`../static/CSharp.png`} />
                  <p className="taskLang">{task.programming_language}</p>
                </div>
              ) : (
                <div className="taskLangContainer">
                  <img
                    className="taskLangLogo"
                    src={`../static/${task.programming_language}.png`.toLowerCase()}
                  />
                  <p className="taskLang">{task.programming_language}</p>
                </div>
              )}
              <p className="taskDate">Started at: {task.start_date}</p>
              {task.repository_name === "None" ? (
                <p className="githubRepo">
                  GitHub Repo:{" "}
                  <span style={{ color: "#adb5bd" }}>
                    {task.repository_name}
                  </span>
                </p>
              ) : (
                <p
                  className="githubRepo"
                  onClick={() => goToRepos(task.repository_name)}
                >
                  GitHub Repo:{" "}
                  <span className="repoName">{task.repository_name}</span>
                </p>
              )}
              {task.status != messages.TASK_INFO.STATUS.COMPLETED ? (
                <section className="taskButtonsSection">
                  <p className="taskStatus">
                    Status:
                    <span className="taskStatus-onGoing">{task.status}</span>
                  </p>
                  <p className="taskHours">Time Spent: {task.time_spent}h</p>
                  <button
                    className="taskComplete"
                    onClick={() => completeTask(task)}
                  >
                    Complete
                  </button>
                  <button
                    className="taskDelete"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </section>
              ) : (
                <section className="taskButtonsSection">
                  <p className="taskStatus">
                    Status:
                    <span className="taskStatus-completed">{task.status}</span>
                  </p>
                  <p className="taskHours">Time Spent: {task.time_spent}h</p>
                  <p className="taskDate">Ended at: {task.end_date}</p>
                  <button
                    className="taskDelete-completed"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </section>
              )}
            </div>
          )
      )}
      <TaskMoreInfo
        userSession={userSession}
        openMoreModal={openMoreModal}
        closeMoreModal={() => setOpenMoreModal(false)}
        persistedTask={persistedTask}
        tasks={tasks}
        setTasks={setTasks}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        timeSpent={timeSpent}
        setTimeSpent={setTimeSpent}
      />
    </>
  );
};
