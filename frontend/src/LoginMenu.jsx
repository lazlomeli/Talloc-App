import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export function LoginMenu() {
  const [username, setUsername] = useState({ username: '' })
  const [password, setPassword] = useState({ password: '' })
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()

  const changeUsername = (e) => {
    setUsername({ username: e.target.value })
  }                                           

  const changePassword = (e) => {
    setPassword({ password: e.target.value })
  }

  const submitData = () => {        
    const user = {
      username: username.username,
      password: password.password
    }
    axios.post('http://localhost:8002/login', user)
    .then((resp) => {
      if(resp.status === 200) {
        setIsLogged(true)
        localStorage.setItem('talloc_username', user.username)
      } else {
        alert("Incorrect user or password. Try again")
      }
    })
  }

  useEffect(() => {
    isLogged === true ? navigate('/dashboard') : null
  }, [isLogged])

  return (
    <div className="log_regPage">
      <img className="tallocLogin" src="../static/talloc.png"/>
      <div className="log_regMenu">
        <input className="log_regInputs" 
                type="text" 
                placeholder="Enter your username" 
                required
                value={ username.username }
                onChange={ (e) => changeUsername(e) } 
              />
        <input className="log_regInputs"
                type="password" 
                placeholder="Enter your password" 
                required
                value={ password.password }
                onChange={ (e) => changePassword(e) }
                />
        <button className="log_regButton" onClick={submitData}>Log in</button>
      </div>
    </div>
  )
}
