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
      status: "Completed"
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
    <>
    {tasks.map(task => (
      <div key={task.id} className="task">
        <h1>{task.title}</h1>
        <p>{task.programming_language}</p>
        <p>Started at: {task.start_date}</p>
        {task.status != "Completed" ? (
          <section>
            <p>{task.status}</p>
              <button onClick={() => completeTask(task)}>Complete</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
          </section>
        ) : (
          <section>
            <p>{task.status}</p>
            <p>Ended at: {task.end_date}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </section>
        )}
      </div>
    ))}
      <div className="createTask">
        <h1>Create a new Task</h1>
        <button onClick={() => setOpenModal(true)}>+</button>
      </div>
      <CreateTask tasks={tasks} setTasks={setTasks} open={openModal} onClose={() => setOpenModal(false)}/>
    </>
  )
}
