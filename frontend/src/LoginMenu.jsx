import axios from 'axios';
import React, { useState, useEffect } from 'react';


export function LoginMenu() {
  const [username, setUsername] = useState({ username: '' })
  const [password, setPassword] = useState({ password: '' })
  const [loggedUser, setLoggedUser] = useState({username: '', password: ''})

  const changeUsername = (e) => {
    setUsername({ username: e.target.value })
  }                                           

  const changePassword = (e) => {
    setPassword({ password: e.target.value })
  }

  const submitData = (e) => {        
    if( loggedUser.username === username.username && loggedUser.password === password.password ) {
      console.log(`Logged as ${username.username}`)
      console.log(loggedUser)
    } else {
      console.log("Could not log in. Try again")
    }
  }

  function userExists(u) {
    axios.get(`http://localhost:8002/users/${u}`)
    .then((resp) => {
      setLoggedUser({username: resp.data.username, password: resp.data.password})
    })
  }

  useEffect(() => {
    userExists(username.username)
  }, [submitData])


  return (
    <div className="signin__menu">
      <form
        onSubmit={ (e) => submitData(e) }
        action="/dashboard"
        > 
        <label htmlFor="loginUsername">
          Username:
          <input 
          name="loginUsername" 
          type="text" 
          placeholder="Enter your username" 
          required
          value={ username.username }
          onChange={ (e) => changeUsername(e) }></input>
        </label>
        <label htmlFor="loginPassword">
          Password:
          <input 
          name="loginPassword"
          type="password" 
          placeholder="Enter your password" 
          required
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
