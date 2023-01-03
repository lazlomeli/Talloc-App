import { useEffect, useState } from 'react'
import { Task } from './Task'
import axios from 'axios'


export const Dashboard = () => {
  return (
    <>
      <section className="taskSection">
        <Task user={localStorage.getItem("talloc_username")}/>
      </section>
    </>
  )
}