import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userAPI from "./services/userService";

const RegisterPage = () => {
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });
  const [repPassword, setRepPassword] = useState({ repPassword: "" });
  const [email, setEmail] = useState({ email: "" });
  const [isRegistered, setIsRegistered] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    isRegistered === true ? navigateTo("/login") : null;
  }, [isRegistered]);

  const changeUsername = (e) => {
    setUsername({ username: e.target.value });
  };
  const changeRepPassword = (e) => {
    setRepPassword({ repPassword: e.target.value });
  };
  const changePassword = (e) => {
    setPassword({ password: e.target.value });
  };
  const changeMail = (e) => {
    setEmail({ email: e.target.value });
  };

  const registeredUser = {
    username: username.username,
    email: email.email,
    password: password.password,
  };

  const isValidUserSyntax = (username) => {
    let validUser = new RegExp(
      "^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
    );
    return validUser.test(username)
      ? true
      : console.log("User syntax is invalid") && false;
  };

  const isValidPassword = () => {
    return password.password === repPassword.repPassword
      ? true
      : console.log("Passwords don't match") && false;
  };

  const signUp = () => {
    if ((isValidUserSyntax(username.username) && isValidPassword()) === true) {
      userAPI
        .registerUser(registeredUser)
        .then(() => {
          setIsRegistered(true);
        })
        .catch(() => {
          console.log("E-mail already exists. Choose a different one.");
        });
    } else {
      console.log("Incorrect registration. Try again");
    }
  };

  return (
    <div className="log_regPage">
      <img className="tallocLogin" src="../static/talloc.png" />
      <div className="registerMenu">
        <h1 className="registerTitles">Username</h1>
        <input
          className="registerInputs"
          type="text"
          placeholder="Choose a username"
          value={username.username}
          onChange={(e) => changeUsername(e)}
          required
        />
        <h1 className="registerTitles">Mail</h1>
        <input
          className="registerInputs"
          type="email"
          placeholder="Type your email"
          value={email.email}
          onChange={(e) => changeMail(e)}
          required
        />
        <h1 className="registerTitles">Password</h1>
        <input
          className="registerInputs"
          type="password"
          placeholder="Choose a password"
          value={password.password}
          onChange={(e) => changePassword(e)}
          required
        />
        <h1 className="registerTitles" />
        <input
          className="registerInputs"
          type="password"
          placeholder="Repeat your password"
          value={repPassword.repPassword}
          onChange={(e) => changeRepPassword(e)}
          required
        />
        <div className="registerLine" />
        <button className="log_regButton" onClick={signUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
