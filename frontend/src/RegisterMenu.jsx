import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterMenu = () => {
  const [username, setUsername] = useState({ username: '' })
  const [password, setPassword] = useState({ password: '' })
  const [repPassword, setRepPassword] = useState({ repPassword: '' })
  const [email, setEmail] = useState({ email: '' })
  const [isRegistered, setIsRegistered] = useState(false)
  const navigate = useNavigate()

  const changeUsername = (e) => {
      setUsername({ username: e.target.value })
  }
  const changeRepPassword = (e) => {
    setRepPassword({ repPassword: e.target.value })
  } 
  const changePassword = (e) => {
    setPassword({ password: e.target.value })
  }
  const changeMail = (e) => {
      setEmail({ email: e.target.value })
  }

  const registeredUser = {
      username: username.username,
      email: email.email,
      password: password.password
  } 
  
  const isValidUserSyntax = (username) => {
    let validUser = new RegExp('^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
    return validUser.test(username) ? true : alert("User syntax is invalid") && false
  }

  const isValidPassword = () => {
    return (password.password === repPassword.repPassword) ? true : alert("Passwords don't match") && false    
  }

  const signUp = () => {
    if(( isValidUserSyntax(username.username) && isValidPassword() ) === true) {
      axios.post('http://localhost:8002/register', registeredUser)
      .then((resp) => {
        if(resp.status === 200) {
          setIsRegistered(true)
        } else {
          console.log("An account with that username or e-mail already exists. Try again")
        }
      })
    } else {
      alert('Incorrect registration. Try again')
    }
  }

  useEffect(() => {
    isRegistered === true ? navigate('/login') : null
  }, [isRegistered])

  return (
    <div className="log_regMenu">
      <h1 className="log_regTitles">Username</h1>
      <input className="log_regInputs" 
              type="text" 
              placeholder="Choose a username" 
              value={ username.username }
              required
              onChange={ (e) => changeUsername(e) } />
      <h1 className="log_regTitles">Mail</h1>
      <input className="log_regInputs"
              type="email"
              placeholder="Type your email"
              value={ email.email }
              required
              onChange={ (e) => changeMail(e) } />
      <h1 className="log_regTitles">Password</h1>
      <input className="log_regInputs"
              type="password" 
              placeholder="Choose a password" 
              value={ password.password }
              required
              onChange={ (e) => changePassword(e) } /> 
      <input className="log_regInputs"
              type="password" 
              placeholder="Repeat your password" 
              value={ repPassword.repPassword }
              required
              onChange={ (e) => changeRepPassword(e) } />
      <button className="log_regButton" onClick={ signUp }>Sign up</button>
    </div>
  )
}

export default RegisterMenu