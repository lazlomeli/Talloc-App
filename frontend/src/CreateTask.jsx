import React, { useState, useEffect, useContext } from "react";
import { ErrorModal } from "./ErrorModal";
import { ErrorContext } from "./services/ErrorContext";
import "../styles/App.css";
import Moment from "moment";
import * as taskAPI from "./services/taskService";
import languages from "../langs.json";
import CrossIcon from "./icon_components/CrossIcon";
import { Oval } from "react-loader-spinner";
import { MessagesContext } from "./services/MessagesContext";
import { LoadingContext } from "./services/LoadingContext";

const CreateTask = ({
  open,
  onClose,
  tasks,
  setTasks,
  taskID,
  taskTitle,
  setTaskTitle,
  taskLang,
  setTaskLang,
  startDate,
  setStartDate,
  endDate,
  taskStatus,
  setTaskStatus,
  repositoryName,
  setRepositoryName,
  taskDescription,
  setTaskDescription,
  timeSpent,
  setTimeSpent,
  setFilterStatus,
  session_u,
  repositories,
}) => {
  const { loadingVisibility, setLoadingVisibility } =
    useContext(LoadingContext);
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);
  const messages = useContext(MessagesContext);

  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

  const newTask = {
    id: taskID,
    title: taskTitle,
    programming_language: taskLang,
    description: taskDescription,
    start_date: startDate,
    end_date: endDate,
    status: taskStatus,
    created_by: session_u,
    repository_name: repositoryName,
    time_spent: "0",
  };

  useEffect(() => {
    const formatDate = Moment().format(messages.DATE_FORMAT.ISO);
    setStartDate(formatDate);
    setTaskStatus(messages.TASK_INFO.STATUS.ON_GOING);
  }, [newTask]);

  function createTask() {
    let t = newTask.title;
    let pl = newTask.programming_language;
    let rn = newTask.repository_name;
    const isEmpty = (str) => !str.trim().length;

    if (
      t === undefined ||
      pl === messages.UX.SELECT_LANGUAGE ||
      rn === messages.UX.SELECT_REPOSITORY ||
      isEmpty(newTask.title) ||
      isEmpty(newTask.programming_language) ||
      isEmpty(newTask.repository_name)
    ) {
      errorModalHandler(messages.ERRORS.INVALID_DATA);
    } else {
      taskAPI
        .postTask(newTask, TASK_API_URL)
        .then((resp) => {
          setLoadingVisibility(true);
          setTimeout(() => {
            setTasks([resp.data].concat([...tasks]));
            setTaskTitle(messages.UX.EMPTY_STRING);
            setTaskLang(messages.UX.SELECT_LANGUAGE);
            setRepositoryName(messages.UX.SELECT_REPOSITORY);
            setTaskDescription(messages.UX.EMPTY_STRING);
            setFilterStatus(messages.TASK_INFO.STATUS.ON_GOING);
            setLoadingVisibility(false);
            onClose();
          }, 500);
        })
        .catch((err) => console.log(err));
    }
  }

  function closeModal() {
    onClose();
    setRepositoryName(messages.UX.SELECT_REPOSITORY);
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
                  value={taskTitle || ""}
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
              <label className="modalLabel">
                <p className="modalLabelName">Description:</p>
              </label>
              <textarea
                className="modalDescription"
                placeholder="Task description is optional"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
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
          {loadingVisibility && (
            <div className="overlay" style={{ zIndex: 2 }} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateTask;
