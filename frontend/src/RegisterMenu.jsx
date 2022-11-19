import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as API from "./services/userService"

const RegisterMenu = () => {
  const [username, setUsername] = useState({ username: '' })
  const [password, setPassword] = useState({ password: '' })
  const [repPassword, setRepPassword] = useState({ repPassword: '' })
  const [email, setMail] = useState({ email: '' })
  const [users, setUsers] = useState([])
  const [exists, setExists] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8002/users/').then((resp) => {
      setUsers(resp.data)
    }) 
  }, [])

  async function userExists(u) {
    users.every(user => {
      return (username.username === user.username) ? false : true
    })
  }

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
      setMail({ email: e.target.value })
  }

  const registeredUser = {
      username: username.username,
      email: email.email,
      password: password.password
  } 
  
  const isValidUser = (u) => {
    const validUser = new RegExp('^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
    return validUser.test(u) ? true : console.log('User is not valid') && false
  }

  const isValidPassword = () => {
    return (password.password === repPassword.repPassword) ? true : console.log("Passwords don't match") && false    
  }

  const signUp = (e) => {
    e.preventDefault()

    if( (exists && isValidUser(username.username) && isValidPassword()) === true ) 
    {
      axios.post('http://localhost:8002/register', registeredUser)
      .catch((err) => console.log('Error: ' + err))
      console.log(`Registered as "${username.username}"`)
    } else {
      console.log("User already exists")
    }
  }

  return (
    <div>
        <form
        onSubmit={ (e) => signUp(e)}
        > 
          <label htmlFor="registerUsername">
            Username:
            <input 
            name="registerUsername" 
            type="text" 
            placeholder="Choose a username" 
            value={ username.username }
            required
            onChange={ (e) => changeUsername(e) } />
          </label>
          <label>
            Mail:
            <input 
            name="registerEmail"
            type="email"
            placeholder="Type your email"
            value={ email.email }
            required
            onChange={ (e) => changeMail(e) }>
            </input>
          </label>
          <label htmlFor="registerPassword">
            Password:
            <input 
            name="registerPassword"
            type="password" 
            placeholder="Choose a password" 
            value={ password.password }
            required
            onChange={ (e) => changePassword(e) } />
          </label>
          <label htmlFor="registerPassword">
            Password:
            <input 
            name="registerRepPassword"
            type="password" 
            placeholder="Repeat your password" 
            value={ repPassword.repPassword }
            required
            onChange={ (e) => changeRepPassword(e) } />
          </label>
          <label>
            <input 
            type="submit" 
            value="Sign up" />
          </label>
        </form>
    </div>
  )
}

export default RegisterMenu