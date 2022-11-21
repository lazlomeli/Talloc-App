import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginMenu } from './LoginMenu'
import RegisterMenu from './RegisterMenu'
import { MainPage } from './MainPage'
import { Dashboard } from './Dashboard'
import {useState, useEffect} from 'react'
import * as taskAPI from './services/taskService'

export const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    taskAPI.getAllTasks().then(setTasks)
  }, [])

  return (
    <>
        <Routes>
            <Route path="/" element={ <MainPage /> }/>
            <Route path="/login" element={ <LoginMenu/> }/>
            <Route path="/register" element={ <RegisterMenu /> }/>
            <Route path="/dashboard" element={ <Dashboard tasks={tasks}/>}/>
        </Routes>
    </>
  )
}