import axios from 'axios';
import React, { useState, useEffect } from 'react';


export function LoginMenu() {
  const [username, setUsername] = useState({ username: '' })
  const [password, setPassword] = useState({ password: '' })
  
  const loggedUser = {
    username: username.username,
    password: password.password
  }

  const changeUsername = (e) => {
    setUsername({ username: e.target.value })
  }

  const changePassword = (e) => {
    setPassword({ password: e.target.value })
  }
  
  const submitData = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8002/login', loggedUser)
    .catch((err) => console.log('Error: ' + err))
  }

  return (
      <div className="signin__menu">
        <form
        onSubmit={ (e) => submitData(e) }
        > 
          <label htmlFor="loginUsername">
            Username:
            <input 
            name="loginUsername" 
            type="text" 
            placeholder="Enter your username" 
            value={ username.username }
            onChange={ (e) => changeUsername(e) }></input>
          </label>
          <label htmlFor="loginPassword">
            Password:
            <input 
            name="loginPassword"
            type="password" 
            placeholder="Enter your password" 
            value={ password.password }
            onChange={ (e) => changePassword(e) }
            ></input>
          </label>
          <label className="login__button">
            <input 
            type="submit" 
            value="Log in" 
            ></input>
          </label>
        </form>
      </div>
  )
}
