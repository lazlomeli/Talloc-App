import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'
import CreateTask from './CreateTask'

export const Task = ({ tasks }) => {
  const [openModal, setOpenModal] = useState(false)

  function completeTask() {
    console.log("completed")
  }

  function deleteTask() {
    console.log("deleted")
  }

  return (
    <>
    {tasks.map(task => (
      <div className="task">
        <h1>{task.title}</h1>
        <p>{task.programming_language}</p>
        <p>{task.start_date}</p>
        <section>
          <p>{task.status}</p>
          <button onClick={() => completeTask()}>Complete</button>
          <button onClick={() => deleteTask()}>Delete</button>
        </section>
      </div>
    ))}
      <div className="createTask">
        <h1>Create a new Task</h1>
        <button onClick={() => setOpenModal(true)}>+</button>
      </div>
      <CreateTask open={openModal} onClose={() => setOpenModal(false)}/>
    </>
  )
}
