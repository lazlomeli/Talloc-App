import React from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { LoginMenu } from './LoginMenu'
import RegisterMenu from './RegisterMenu'
import { MainPage } from './MainPage'
import { Dashboard } from './Dashboard'

export const App = () => {

  return (
    <>
        <Routes>
            <Route path="/" element={ <MainPage /> }/>
            <Route path="/login" element={ <LoginMenu/> }/>
            <Route path="/register" element={ <RegisterMenu /> }/>
            <Route path="/dashboard" element={ <Dashboard />}/>
        </Routes>
    </>
  )
}