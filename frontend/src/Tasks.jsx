import React, { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import Moment from "moment";
import * as taskAPI from "./services/taskService";

const Tasks = ({ userSession }) => {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskAPI.getUserTasks(userSession).then((resp) => {
      setTasks(resp.data);
    });
  }, []);

  let repositories = JSON.parse(localStorage.getItem("repositories"));
  repositories.unshift("None");
  repositories.unshift("Select your repository");

  function completeTask(task) {
    const newTask = {
      id: task.id,
      title: task.title,
      programming_language: task.programming_language,
      start_date: task.start_date,
      end_date: Moment().format("MMM Do YYYY"),
      status: "COMPLETED",
      created_by: userSession,
      repository_name: task.repository_name,
    };

    taskAPI.updateTask(task.id, newTask).then(() => {
      let updatedTasks = tasks.filter((t) =>
        t.id === newTask.id ? false : true
      );
      updatedTasks.push(newTask);
      setTasks(updatedTasks);
    });
  }

  function deleteTask(id) {
    taskAPI.deleteTaskByID(id).then(() => {
      setTasks([...tasks.filter((task) => (task.id === id ? false : true))]);
    });
  }

  function goToRepos(repository) {
    try {
      window.location.href = `https://github.com/${userSession}/${repository}`;
    } catch (error) {
      errorModalHandler("Something went wrong. Please try again");
    }
  }

  return (
    <div className="dashboardTasks">
      {tasks.map((task) => (
        <div key={task.id} className="task">
          {task.title.length <= 30 ? (
            <h1 title={task.title} className="taskTitle">
              {task.title}
            </h1>
          ) : (
            <h1 title={task.title} className="taskTitle">
              {task.title.substring(0, 30)}...
            </h1>
          )}
          <div className="taskLine"></div>
          {task.programming_language === "C#" ? (
            <div className="taskLangContainer">
              <img className="taskLangLogo" src={`../static/CSharp.png`} />
              <p className="taskLang">{task.programming_language}</p>
            </div>
          ) : (
            <div className="taskLangContainer">
              <img
                className="taskLangLogo"
                src={`../static/${task.programming_language}.png`}
              />
              <p className="taskLang">{task.programming_language}</p>
            </div>
          )}
          <p className="taskDate">Started at: {task.start_date}</p>
          {task.repository_name === "None" ? (
            <p className="githubRepo">
              GitHub Repo:{" "}
              <span style={{ color: "#adb5bd" }}>{task.repository_name}</span>
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
          {task.status != "COMPLETED" ? (
            <section className="taskButtonsSection">
              <p className="taskStatus">
                Status:
                <span className="taskStatus-onGoing">{task.status}</span>
              </p>
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
            <section className="taskButtonsSection-completed">
              <p className="taskStatus">
                Status:
                <span className="taskStatus-completed">{task.status}</span>
              </p>
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
      ))}
      <div className="createTask">
        <h1 className="createTaskTitle">Create a new task</h1>
        <button className="createTaskButton" onClick={() => setOpenModal(true)}>
          +
        </button>
      </div>
      <CreateTask
        tasks={tasks}
        setTasks={setTasks}
        open={openModal}
        onClose={() => setOpenModal(false)}
        session_u={userSession}
        repositories={repositories}
      />
    </div>
  );
};

export default Tasks;
