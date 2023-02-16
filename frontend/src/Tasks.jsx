import React, { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import * as taskAPI from "./services/taskService";
import { Task } from "./Task";

const Tasks = ({ userSession }) => {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskID] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskLang, setTaskLang] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [filterStatus, setFilterStatus] = useState("ON GOING");

  useEffect(() => {
    taskAPI.getUserTasks(userSession).then((resp) => {
      setTasks(resp.data);
    });
  }, []);

  let repositories = JSON.parse(localStorage.getItem("repositories"));
  repositories.unshift("None");
  repositories.unshift("Select your repository");

  function filterTasks(status) {
    setFilterStatus(status);
  }

  return (
    <section className="dashboard">
      <div className="dashboardFilter">
        <p className="dashboardFilterInfo">Filter tasks by... </p>
        <button
          className="dashboardFilterOnGoing"
          onClick={() => filterTasks("ON GOING")}
        >
          ON GOING
        </button>
        <button
          className="dashboardFilterCompleted"
          onClick={() => filterTasks("COMPLETED")}
        >
          COMPLETED
        </button>
      </div>
      <div className="dashboardTasks">
        <Task
          userSession={userSession}
          tasks={tasks}
          setTasks={setTasks}
          filterStatus={filterStatus}
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
