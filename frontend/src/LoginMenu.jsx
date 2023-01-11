import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as taskAPI from './services/taskService'
import * as userAPI from './services/userService'


export function LoginMenu() {
  const [username, setUsername] = useState({ username: '' })
  const [password, setPassword] = useState({ password: '' })
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    isLogged === true ? (
      taskAPI.getGithubRepos(username.username)
      .then((resp) => {
        let data = resp.data
        let repositories = []
        data.map(repo => repositories.push(repo.name))
        localStorage.setItem("repositories", JSON.stringify(repositories))
      })
      .catch(() => {
        localStorage.setItem("repositories", "None")
      })
    ) : null
  }, [isLogged])

  useEffect(() => {
    isLogged === true ? (
      setTimeout(() => {
      navigate('/dashboard')
    }, 1500)
    ) : null
  }, [isLogged])

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
    userAPI.logIn(user).then((resp) => {
      if(resp.status === 200) {
        setIsLogged(true)
        localStorage.setItem('talloc_username', user.username)
        localStorage.setItem('talloc_user_token', resp.data.token)
      } else {
        alert("Incorrect user or password. Try again")
      }
    })
  }

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
