import React, { useState, useEffect, useContext } from "react";
import CreateTask from "./CreateTask";
import { CaretDownIcon } from "./icon_components/CaretDownIcon";
import { CaretUpIcon } from "./icon_components/CaretUpIcon";
import { InfoModal } from "./InfoModal";
import * as taskAPI from "./services/taskService";
import { Task } from "./Task";
import { MessagesContext } from "./services/MessagesContext";
import { InfoContext } from "./services/InfoContext";
import { LoadingContext } from "./services/LoadingContext";
import { Oval } from "react-loader-spinner";

const Tasks = ({ userSession }) => {
  const messages = useContext(MessagesContext);
  const [openModal, setOpenModal] = useState(false);
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
  const [filterStatus, setFilterStatus] = useState(
    messages.TASK_INFO.STATUS.ON_GOING
  );
  const { openInfoModal, setOpenInfoModal } = useContext(InfoContext);
  const { infoMessage, setInfoMessage } = useContext(InfoContext);
  const { infoModalHandler } = useContext(InfoContext);
  const { loadingVisibility, setLoadingVisibility } =
    useContext(LoadingContext);

  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

  useEffect(() => {
    setLoadingVisibility(true);
    setTimeout(() => {
      taskAPI.getUserTasks(userSession, TASK_API_URL).then((resp) => {
        setTasks(resp.data.reverse());
        setLoadingVisibility(false);
      });
    }, 150);
  }, [userSession]);

  let repositories = JSON.parse(
    localStorage.getItem(messages.LOCAL_STORAGE.REPOS)
  );
  repositories.unshift(messages.UX.NONE);
  repositories.unshift(messages.UX.SELECT_REPOSITORY);

  return (
    <section className="dashboard">
      {showFilterBar === true ? (
        <div className="dashboardFilter">
          <div className="dashboardFilterLeft">
            <p className="dashboardFilterInfo">Filter: </p>
            <button
              className="dashboardFilterOnGoing"
              onClick={() => {
                setFilterStatus(messages.TASK_INFO.STATUS.ON_GOING);
                infoModalHandler(messages.TASK_INFO.ON_GOING);
              }}
            >
              ON GOING
            </button>
            <button
              className="dashboardFilterCompleted"
              onClick={() => {
                setFilterStatus(messages.TASK_INFO.STATUS.COMPLETED);
                infoModalHandler(messages.TASK_INFO.COMPLETED);
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
        message={infoMessage}
        openModal={openInfoModal}
        closeModal={() => setOpenInfoModal(false)}
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
    </section>
  );
};

export default Tasks;
