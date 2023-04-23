import React, { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import { CaretDownIcon } from "./icon_components/CaretDownIcon";
import { CaretUpIcon } from "./icon_components/CaretUpIcon";
import { InfoModal } from "./InfoModal";
import * as taskAPI from "./services/taskService";
import { Task } from "./Task";

const Tasks = ({ userSession }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterModalMessage, setFilterModalMessage] = useState("");
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskID] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskLang, setTaskLang] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [filterStatus, setFilterStatus] = useState("ON GOING");

  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL

  useEffect(() => {
    taskAPI.getUserTasks(userSession, TASK_API_URL).then((resp) => {
      setTasks(resp.data.reverse());
    });
  }, []);

  let repositories = JSON.parse(localStorage.getItem("repositories"));
  repositories.unshift("None");
  repositories.unshift("Select your repository");

  function infoModalHandler(message) {
    setOpenFilterModal(true);
    setFilterModalMessage(message);
    setTimeout(() => {
      setOpenFilterModal(false);
    }, 3000);
  }

  return (
    <section className="dashboard">
      {showFilterBar === true ? (
        <div className="dashboardFilter">
          <div className="dashboardFilterLeft">
            <p className="dashboardFilterInfo">Filter: </p>
            <button
              className="dashboardFilterOnGoing"
              onClick={() => {
                setFilterStatus("ON GOING");
                infoModalHandler("Showing on going tasks");
              }}
            >
              ON GOING
            </button>
            <button
              className="dashboardFilterCompleted"
              onClick={() => {
                setFilterStatus("COMPLETED");
                infoModalHandler("Showing completed tasks");
              }}
            >
              COMPLETED
            </button>
          </div>
          <CaretUpIcon closeModal={() => setShowFilterBar(false)} />
        </div>
      ) : (
        <div className="dashboardFilter-closed">
          <p className="dashboardFilterInfo-closed">Filter</p>
          <CaretDownIcon closeModal={() => setShowFilterBar(true)} />
        </div>
      )}

      <InfoModal
        message={filterModalMessage}
        openModal={openFilterModal}
        closeModal={() => setOpenFilterModal(false)}
      />
      <div className="dashboardTasks">
        <Task
          userSession={userSession}
          tasks={tasks}
          setTasks={setTasks}
          filterStatus={filterStatus}
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          timeSpent={timeSpent}
          setTimeSpent={setTimeSpent}
        />
        <div className="createTask">
          <h1 className="createTaskTitle">Create a new task</h1>
          <button
            className="createTaskButton"
            onClick={() => setOpenModal(true)}
          >
            +
          </button>
        </div>
        <CreateTask
          open={openModal}
          onClose={() => setOpenModal(false)}
          tasks={tasks}
          setTasks={setTasks}
          taskID={taskID}
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          taskLang={taskLang}
          setTaskLang={setTaskLang}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          taskStatus={taskStatus}
          setTaskStatus={setTaskStatus}
          repositoryName={repositoryName}
          setRepositoryName={setRepositoryName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          timeSpent={timeSpent}
          setTimeSpent={setTimeSpent}
          setFilterStatus={setFilterStatus}
          session_u={userSession}
          repositories={repositories}
        />
      </div>
    </section>
  );
};

export default Tasks;
