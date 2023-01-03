import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'
import CreateTask from './CreateTask'
import Insights from './Insights'
import Moment from 'moment'
import * as API from './services/taskService'
import { Navigate, useNavigate } from 'react-router-dom';


export const Task = (session_user) => {
  const [openModal, setOpenModal] = useState(false)
  const [tasks, setTasks] = useState([])
  const [togglePage, setTogglePage] = useState('dashboard')
  const navigate = useNavigate()

  const repositories = JSON.parse(localStorage.getItem("repositories"))

  useEffect(() => {
    API.getUserTasks(session_user.user).then((resp) => {
      setTasks(resp.data)
    })
  }, [])


  function completeTask(task) { 
    const newTask = {
      id: task.id,
      title: task.title,
      programming_language: task.programming_language,
      start_date: task.start_date,
      end_date: Moment().format('MMM Do YYYY'),
      status: "COMPLETED",
      created_by: session_user.user,
      repository_name: task.repository_name
    }

    axios.put(`http://localhost:8002/tasks/${task.id}`, newTask)
    .then(() => {
        let updatedTasks = tasks.filter(t => t.id === newTask.id ? false : true)
        updatedTasks.push(newTask)
        setTasks(updatedTasks)
    })
  }

  function deleteTask(id) {
    axios.delete(`http://localhost:8002/tasks/${id}`)
    .then(() => {
      setTasks([...tasks.filter(task => task.id === id ? false : true)])
    })
  }

  function goToInsights() {
    setTogglePage('insights')
  }

  function goToDashbord() {
    setTogglePage('dashboard')
  }

  function learnMore() {
    window.location.href = 'https://github.com/lazlomeli'
  }

  function goToRepos() {
    try {
      window.location.href = `https://github.com/${session_user.user}?=repositories`
    } catch (error) {
      console.log("Something went wrong. Please try again")
    }
  }

  function logout() {
    navigate('/')
  }

  return (
    <div className="dashboardPage">
      <div className="dashboardTop">
        <section className="dashboardTopLeftSection">
          <img className="dashboardTopLogo" src={"../static/talloc.png"}/>
          <h1 className="dashboardTopTitle">Talloc App</h1>
          <p className="dashboardTopDesc">Think. Plan. Achieve.</p>
        </section>
        <section className="dashboardTopRightSect">
          <img className="githubLogo" src={"../static/github.png"}/>
          <p className="learnMore" onClick={() => learnMore()}>Learn more!</p>
        </section>
      </div>
      <div className="dashboardSide">
        <h1 className="dashboardSideTitle">Welcome, {localStorage.getItem('talloc_username')}</h1>
        <p className="dashboardSideDesc">Click to navigate:</p>
        <section className="dashboardSideBox">
          <p className="dashboardSideBoxOption" onClick={() => goToDashbord()}>Dashboard</p>
        </section>
        <section className="dashboardSideBox">
          <p className="dashboardSideBoxOption" onClick={() => goToInsights()}>Insights</p>
        </section>
        <section className="logout" onClick={() => logout()}>
          <img className="logoutLogo" src={"../static/logout.png"}/>
          <p className="logoutDesc">Log out</p>
        </section>
      </div>
      {togglePage === 'dashboard' ? (
        <div className="dashboardTasks">
        {tasks.map(task => (
          <div key={task.title} className="task">
            <h1 className="taskTitle">{task.title}</h1>
            <div className="taskLine"></div>
            <div className="taskLangContainer">
              <img className="taskLangLogo" src={`../static/${task.programming_language}.png`}/>
              <p className="taskLang">{task.programming_language}</p>
            </div>
            <p className="taskDate">Started at: {task.start_date}</p>
            <p className="githubRepo" onClick={() => goToRepos()}>GitHub Repo: <span className="repoName">{task.repository_name}</span></p>
            {task.status != "COMPLETED" ? (
              <section className="taskButtonsSection">
                <p className="taskStatus">Status:<span className="taskStatus-onGoing">{task.status}</span></p>
                  <button className="taskComplete" onClick={() => completeTask(task)}>Complete</button>
                  <button className="taskDelete" onClick={() => deleteTask(task.id)}>Delete</button>
              </section>
            ) : (
              <section className="taskButtonsSection-completed">
                <p className="taskStatus">Status:<span className="taskStatus-completed">{task.status}</span></p>
                <p className="taskDate">Ended at: {task.end_date}</p>
                <button className="taskDelete-completed" onClick={() => deleteTask(task.id)}>Delete</button>
              </section>
            )}
          </div>
          ))}
          <div className="createTask">
            <h1 className="createTaskTitle">Create a new task</h1>
            <button className="createTaskButton" onClick={() => setOpenModal(true)}>+</button>
          </div>
          <CreateTask 
          tasks={tasks} 
          setTasks={setTasks} 
          open={openModal} onClose={() => setOpenModal(false)} 
          session_u={session_user} 
          repositories={repositories}
          />
      </div>
      ) : (
        <Insights session_user={session_user}/>
      )}
    </div>
  )
}
