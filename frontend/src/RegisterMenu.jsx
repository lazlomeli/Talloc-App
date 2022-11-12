import axios from 'axios';
import React, { useState } from 'react';

const RegisterMenu = () => {

    const [username, setUsername] = useState({ username: '' })
    const [password, setPassword] = useState({ password: '' })
    const [email, setMail] = useState({ email: '' })

    const changeUsername = (e) => {
        setUsername({ username: e.target.value })
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

    const signUp = (e) => {
        e.preventDefault() 

        console.log(JSON.stringify(registeredUser, null, 2))

        axios.post('http://localhost:8002/register', registeredUser)
        .catch((err) => console.log('Error: ' + err))
    }

  return (
    <div>
        <form
        onSubmit={ (e) => signUp(e) }
        > 
          <label htmlFor="registerUsername">
            Username:
            <input 
            name="registerUsername" 
            type="text" 
            placeholder="Choose a username" 
            value={ username.username }
            required
            onChange={ (e) => changeUsername(e) }></input>
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
            onChange={ (e) => changePassword(e) }
            ></input>
          </label>
          <label>
            <input 
            type="submit" 
            value="Sign up" 
            ></input>
          </label>
        </form>
    </div>
  )
}

export default RegisterMenu