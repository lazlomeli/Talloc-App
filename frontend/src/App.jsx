import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginMenu } from './LoginMenu'
import RegisterMenu from './RegisterMenu'
import { MainPage } from './MainPage'
import { Dashboard } from './Dashboard'
import Insights from './Insights'


export const App = () => {

  return (
    <>
      <Routes> 
        <Route path="/" element={ <MainPage /> }/>
        <Route path="/register" element={ <RegisterMenu/> }/>
        <Route path="/login" element={ <LoginMenu/> }/>
        <Route path="/dashboard" element={ <Dashboard/> }/>
        <Route path="/insights" element={ <Insights/> }/>
      </Routes>
    </>
  )
}