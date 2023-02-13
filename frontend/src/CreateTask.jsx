import React, { useState, useEffect, useContext } from "react";
import { ErrorModal } from "./ErrorModal";
import { ErrorContext } from "./services/ErrorContext";
import "../styles/App.css";
import Moment from "moment";
import * as taskAPI from "./services/taskService";
import languages from "../langs.json";
import CrossIcon from "./icon_components/CrossIcon";

const CreateTask = ({
  open,
  onClose,
  tasks,
  setTasks,
  session_u,
  repositories,
}) => {
  const [taskID, setTaskID] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskLang, setTaskLang] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);

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
    let pl = newTask.programming_language;
    let rn = newTask.repository_name;
    let t = newTask.title;
    const isEmpty = (str) => !str.trim().length;

    if (
      pl === "Select the language" ||
      rn === "Select your repository" ||
      t === null ||
      isEmpty(newTask.title)
    ) {
      errorModalHandler("Choose valid data");
    } else {
      taskAPI
        .postTask(newTask)
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
    <>
      <div className="modal">
        <div onClick={() => closeModal()} className="overlay">
          <div onClick={(e) => e.stopPropagation()} className="modalContainer">
            <CrossIcon toggleModal={closeModal} />
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
            <ErrorModal
              message={errorMessage}
              openModal={openErrorModal}
              closeModal={() => setOpenErrorModal(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
