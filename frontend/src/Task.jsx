import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'
import CreateTask from './CreateTask'
import Moment from 'moment'
import * as API from './services/taskService'


export const Task = () => {
  const [openModal, setOpenModal] = useState(false)
  const [taskID, setTaskID] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    API.getAllTasks().then((resp) => {
      setTasks(resp.data)
    })
  }, [])


  function completeTask(task) { 
    const newTask = {
      title: task.title,
      programming_language: task.programming_language,
      start_date: task.start_date,
      end_date: Moment().format('MMM Do YYYY'),
      status: "COMPLETED"
    }

    axios.put(`http://localhost:8002/tasks/${task.id}`, newTask)
    .then((resp) => {
      console.log(resp.data)
    })
  }

  function deleteTask(id) {
    axios.delete(`http://localhost:8002/tasks/${id}`)
    .then(() => {
      setTasks([...tasks.filter(task => task.id === id ? false : true)])
    })
  }

  return (
    <div className="dashboardPage">
      <div className="dashboardTop"></div>
      <div className="dashboardSide"></div>
      <div className="dashboardTasks">
        {tasks.map(task => (
          <div key={task.id} className="task">
            <h1 className="taskTitle">{task.title}</h1>
            <div className="taskLine"></div>
            <div className="taskLangContainer">
              <img className="taskLangLogo" src={`../static/${task.programming_language}.png`}/>
              <p className="taskLang">{task.programming_language}</p>
            </div>
            <p className="taskDate">Started at: {task.start_date}</p>
            {task.status != "Completed" ? (
              <section className="taskButtonsSection">
                <p className="taskStatus-onGoing">{task.status}</p>
                  <button className="taskComplete" onClick={() => completeTask(task)}>Complete</button>
                  <button className="taskDelete" onClick={() => deleteTask(task.id)}>Delete</button>
              </section>
            ) : (
              <section className="taskButtonsSection-completed">
                <p className="taskStatus-completed">{task.status}</p>
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
          <CreateTask tasks={tasks} setTasks={setTasks} open={openModal} onClose={() => setOpenModal(false)}/>
      </div>
    </div>
  )
}
