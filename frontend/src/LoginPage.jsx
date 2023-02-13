import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "./ErrorModal";
import { ErrorContext } from "./services/ErrorContext";
import * as taskAPI from "./services/taskService";
import * as userAPI from "./services/userService";

export function LoginPage() {
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });
  const [isLogged, setIsLogged] = useState(false);
  const navigateTo = useNavigate();
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);

  useEffect(() => {
    if (isLogged === true) {
      taskAPI
        .getGithubRepos(localStorage.getItem("talloc_github_username"))
        .then((resp) => {
          let data = resp.data;
          let repositories = [];
          data.map((repo) => repositories.push(repo.name));
          localStorage.setItem("repositories", JSON.stringify(repositories));
          navigateTo("/dashboard");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            let repositories = [];
            localStorage.setItem("repositories", JSON.stringify(repositories));
            navigateTo("/dashboard");
          }
        });
    }
  }, [isLogged]);

  const submitData = () => {
    let u = username.username;
    let p = password.password;

    const user = {
      username: u,
      password: p,
    };

    const isEmpty = (str) => !str.trim().length;

    if (isEmpty(u) || isEmpty(p)) {
      errorModalHandler("The provided user credentials are wrong. Try again");
    }

    userAPI
      .logIn(user)
      .then((resp) => {
        setIsLogged(true);
        localStorage.setItem(
          "talloc_github_username",
          resp.data.github_username
        );
        localStorage.setItem("talloc_username", user.username);
      })
      .catch(() => {
        errorModalHandler("The provided user credentials are wrong. Try again");
      });
  };

  const changeUsername = (e) => {
    setUsername({ username: e.target.value });
  };

  const changePassword = (e) => {
    setPassword({ password: e.target.value });
  };

  return (
    <div className="log_regPage">
      <ErrorModal
        message={errorMessage}
        openModal={openErrorModal}
        closeModal={() => setOpenErrorModal(false)}
      />
      <img className="tallocLogin" src="../static/talloc.png" />
      <div className="log_regMenu">
        <input
          className="log_regInputs"
          type="text"
          placeholder="Enter your username"
          value={username.username}
          required
          onChange={(e) => changeUsername(e)}
        />
        <input
          className="log_regInputs"
          type="password"
          placeholder="Enter your password"
          value={password.password}
          required
          onChange={(e) => changePassword(e)}
        />
        <button className="log_regButton" onClick={() => submitData()}>
          Log in
        </button>
      </div>
    </div>
  );
}
