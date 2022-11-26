import { useEffect, useState } from 'react'
import { Task } from './Task'
import axios from 'axios'


export const Dashboard = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8002/tasks')
    .then((resp) => {
      setTasks(resp.data)
    })
  }, [])

  return (
    <>
      <section className="taskSection">
        <Task tasks={tasks} />
      </section>
    </>
  )
}