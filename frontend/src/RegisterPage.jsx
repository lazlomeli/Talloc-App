import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "./ErrorModal";
import { ErrorContext } from "./services/ErrorContext";
import * as userAPI from "./services/userService";

const RegisterPage = () => {
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });
  const [repPassword, setRepPassword] = useState({ repPassword: "" });
  const [email, setEmail] = useState({ email: "" });
  const [githubUsername, setGithubUsername] = useState({ githubUsername: "" });
  const [checkedRadio, setCheckedRadio] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);
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
    github_username: githubUsername.githubUsername,
  };

  const isValidUserSyntax = () => {
    let validUser = new RegExp(
      "^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
    );
    return validUser.test(username.username) ? true : false;
  };

  const isValidPassword = () => {
    return password.password === repPassword.repPassword ? true : false;
  };

  const isValidEmail = () => {
    let validEmail = new RegExp(/[a-z]+@[a-z]+.(com|es|org|net)/); // CAMBIAR
    return validEmail.test(email) ? true : false;
  };

  const signUp = () => {
    if ((isValidUserSyntax() && isValidPassword() && isValidEmail()) === true) {
      userAPI
        .registerUser(registeredUser)
        .then(() => {
          setIsRegistered(true);
        })
        .catch(() => {
          errorModalHandler("E-mail already exists. Choose a different one");
        });
    } else {
      errorModalHandler("Incorrect username or password. Try again");
    }
  };

  return (
    <div className="log_regPage">
      <img className="tallocLogin" src="../static/talloc.png" />
      <ErrorModal
        message={errorMessage}
        openModal={openErrorModal}
        closeModal={() => setOpenErrorModal(false)}
      />
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
        <section className="registerGitHub">
          <h1 className="registerQuestion">Do you have a GitHub account?</h1>
          <div className="registerQuestionContainer">
            <div>
              <label className="registerRadio" htmlFor="registerRadio">
                Yes
                <input
                  type="radio"
                  id="registerRadio"
                  name="regRad"
                  value={checkedRadio}
                  onChange={(e) => setCheckedRadio("Yes")}
                />
              </label>
              <label className="registerRadio" htmlFor="registerRadio">
                No
                <input
                  type="radio"
                  id="registerRadio"
                  name="regRad"
                  value={checkedRadio}
                  onChange={() => setCheckedRadio("No")}
                />
              </label>
            </div>
            {checkedRadio === "Yes" ? (
              <input
                className="registerGitHubInput"
                type="text"
                placeholder="GitHub Username"
                value={githubUsername.githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                required
              />
            ) : (
              <></>
            )}
          </div>
        </section>
        <div className="registerLine" />
        <button className="log_regButton" onClick={signUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
