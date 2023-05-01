import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "./ErrorModal";
import { ErrorContext } from "./services/ErrorContext";
import * as userAPI from "./services/userService";
import { MessagesContext } from "./services/MessagesContext";

const RegisterPage = () => {
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });
  const [repPassword, setRepPassword] = useState({ repPassword: "" });
  const [email, setEmail] = useState({ email: "" });
  const [githubUsername, setGithubUsername] = useState({ githubUsername: "" });
  const [githubPAT, setGithubPAT] = useState({ githubPAT: "" });
  const [checkedRadio, setCheckedRadio] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);
  const navigateTo = useNavigate();
  const messages = useContext(MessagesContext);

  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL;

  useEffect(() => {
    isRegistered === true ? navigateTo(`${messages.ENDPOINT.LOGIN}`) : null;
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
  const changeGitHubUsername = (e) => {
    setGithubUsername({ githubUsername: e.target.value });
  };
  const changeGitHubPAT = (e) => {
    setGithubPAT({ githubPAT: e.target.value });
  };

  const showTokenTutorial = () => {
    window.open(
      `https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/`
    );
  };

  const registeredUser = {
    username: username.username.toLowerCase(),
    email: email.email.toLowerCase(),
    password: password.password.toLowerCase(),
    github_username: githubUsername.githubUsername.toLowerCase(),
    github_pat: githubPAT.githubPAT,
  };

  const isValidUserSyntax = () => {
    let validUser = new RegExp(messages.REGEXP.VALID_USERNAME);
    return validUser.test(username.username) ? true : false;
  };

  const isValidPassword = () => {
    return password.password === repPassword.repPassword ? true : false;
  };

  const isValidEmail = () => {
    let validEmail = new RegExp(messages.REGEXP.VALID_EMAIL);
    return validEmail.test(email.email) ? true : false;
  };

  const signUp = () => {
    if ((isValidUserSyntax() && isValidPassword() && isValidEmail()) === true) {
      userAPI
        .registerUser(registeredUser, GATEWAY_API_URL)
        .then(() => {
          setIsRegistered(true);
        })
        .catch((err) => {
          console.log(err);
          errorModalHandler(messages.ERRORS.EMAIL_EXISTS);
        });
    } else {
      errorModalHandler(messages.ERRORS.WRONG_CREDENTIALS_2);
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
          type="text"
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
                  onChange={() => setCheckedRadio(messages.UX.YES)}
                />
              </label>
              <label className="registerRadio" htmlFor="registerRadio">
                No
                <input
                  type="radio"
                  id="registerRadio"
                  name="regRad"
                  value={checkedRadio}
                  onChange={() => setCheckedRadio(messages.UX.NO)}
                />
              </label>
            </div>
            {checkedRadio === messages.UX.YES && (
              <input
                className="registerGitHubInput"
                type="text"
                placeholder="GitHub Username"
                value={githubUsername.githubUsername}
                onChange={(e) => changeGitHubUsername(e)}
                required
              />
            )}
          </div>
        </section>
        <section>
          {checkedRadio === messages.UX.YES && (
            <div className="gitHubPATSection">
              <h1
                className="registerQuestionPAT"
                onClick={() => showTokenTutorial()}
              >
                Generate GitHub fine-grained PAT
              </h1>
              <input
                className="registerInputPAT"
                type="text"
                placeholder="GitHub PAT"
                value={githubPAT.githubPAT}
                onChange={(e) => changeGitHubPAT(e)}
                required
              />
            </div>
          )}
        </section>
        {/* <div className="registerLine" /> */}
        <button className="log_regButton" onClick={signUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
