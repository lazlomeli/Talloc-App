import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Moment from "moment";
import * as taskAPI from "./services/taskService";
import * as auth from "./services/authService";
import languages from "../langs.json";

const CreateTask = ({
  open,
  onClose,
  tasks,
  setTasks,
  session_u,
  repositories,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskLang, setTaskLang] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [repositoryName, setRepositoryName] = useState("");

  const newTask = {
    id: taskID,
    title: taskTitle,
    programming_language: taskLang,
    start_date: startDate,
    end_date: endDate,
    status: taskStatus,
    created_by: session_u,
    repository_name: repositoryName,
  };

  useEffect(() => {
    const formatDate = Moment().format("MMM Do YYYY");
    setStartDate(formatDate);
    setTaskStatus("ON GOING");
  }, [newTask]);

  function createTask() {
    if (
      (newTask.programming_language === "Select the language" ||
        newTask.programming_language === "") &&
      (newTask.repository_name === "Select your repository" ||
        newTask.repository_name === "")
    ) {
      alert("Choose valid data");
    } else {
      taskAPI
        .postTask(newTask, auth.config())
        .then((resp) => {
          setTasks([...tasks, resp.data]);
          setTaskTitle("");
          setTaskLang("Select the language");
          setRepositoryName("Select your repository");
          onClose();
        })
        .catch((err) => console.log(err));
    }
  }

  function closeModal() {
    onClose();
    setRepositoryName("Select your repository");
  }

  if (!open) return null;
  return (
    <div className="modal">
      <div onClick={() => closeModal()} className="overlay">
        <div onClick={(e) => e.stopPropagation()} className="modalContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="modalClose"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#515b67"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => closeModal()}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
          <form className="modalForm" onSubmit={(e) => createTask(e)}>
            <label htmlFor="taskTitle" className="modalLabel">
              <p className="modalLabelName">Task title:</p>
              <input
                name="taskTitle"
                type="text"
                placeholder="Enter the task title"
                className="modalInput"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </label>
            <label className="modalLabel">
              <p className="modalLabelName">Language:</p>
              <select
                value={taskLang}
                className="modalSelect"
                onChange={(e) => setTaskLang(e.target.value)}
              >
                {languages.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="modalLabel">
              <p className="modalLabelName">GitHub Repository:</p>
              <select
                value={repositoryName}
                className="modalSelect"
                onChange={(e) => setRepositoryName(e.target.value)}
              >
                {repositories.map((repo) => (
                  <option key={repo}>{repo}</option>
                ))}
              </select>
            </label>
          </form>
          <label className="modalLabel_submit">
            <input
              type="submit"
              value="Create Task"
              className="submitCreateTask"
              onClick={() => createTask()}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
