import React from 'react'
import CreateTask from './CreateTask'
import { Task } from './Task'

export const Dashboard = ({ tasks }) => { 

  return (
    <>
      <section className="taskSection">
        <Task tasks={tasks} />
      </section>
    </>
  )
}