import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "./ErrorModal";
import { ErrorContext } from "./services/ErrorContext";
import * as userAPI from "./services/userService";
import { MessagesContext } from "./services/MessagesContext";
import { ForgotPassword } from "./ForgotPassword";

export function LoginPage() {
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });
  const [githubUsername, setGithubUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [forgotPassVisibility, setForgotPassVisibility] = useState(false);
  const [recoveryUsername, setRecoveryUsername] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [recoveryCodeVisibility, setRecoveryCodeVisibility] = useState(false);
  const [recoveryMail, setRecoveryMail] = useState("");
  const navigateTo = useNavigate();
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);
  const messages = useContext(MessagesContext);

  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL;
  const RECOVERY_URL = import.meta.env.VITE_RECOVERY_URL;

  useEffect(() => {
    if (isLogged === true) {
      const tallocUsername = { talloc_username: username.username };
      userAPI
        .getGithubRepos(tallocUsername, githubUsername, GATEWAY_API_URL)
        .then((resp) => {
          let data = resp.data;
          let repositories = [];
          data.map((repo) => repositories.push(repo.name));
          localStorage.setItem(
            messages.LOCAL_STORAGE.REPOS,
            JSON.stringify(repositories)
          );
          navigateTo(`/dashboard`);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogged]);

  const userExists = () => {
    userAPI
      .recoverUser(recoveryUsername, RECOVERY_URL)
      .then((resp) => {
        setRecoveryMail(resp.data.email);
      })
      .catch((err) => {
        errorModalHandler(messages.ERRORS.USER_DOESNT_EXIST);
      });
  };

  const sendMail = () => {
    userExists();

    if (recoveryMail !== messages.UX.EMPTY_STRING) {
      // EmailJS logic
      setRecoveryCodeVisibility(true);
    }
  };

  const submitData = async () => {
    let u = username.username.toLowerCase();
    let p = password.password.toLowerCase();

    const user = {
      username: u,
      password: p,
    };

    const isEmpty = (str) => !str.trim().length;

    if (isEmpty(u) || isEmpty(p)) {
      errorModalHandler(messages.ERRORS.WRONG_CREDENTIALS_1);
      return;
    }
    try {
      const login = await userAPI.logIn(user, GATEWAY_API_URL);
      localStorage.setItem(
        messages.LOCAL_STORAGE.GITHUB_USERNAME,
        login.data.github_username
      );
      setGithubUsername(login.data.github_username);

      const encryptSession = await userAPI.encryptSession(
        { username: user.username },
        GATEWAY_API_URL
      );

      localStorage.setItem(
        messages.LOCAL_STORAGE.TALLOC_USERNAME,
        encryptSession.data
      );
      setGithubUsername(
        localStorage.getItem(messages.LOCAL_STORAGE.GITHUB_USERNAME)
      );
      setIsLogged(true);
    } catch (error) {
      errorModalHandler(messages.ERRORS.WRONG_CREDENTIALS_1);
    }
  };

  const changeUsername = (e) => {
    setUsername({ username: e.target.value });
  };

  const changePassword = (e) => {
    setPassword({ password: e.target.value });
  };

  return (
    <>
      {forgotPassVisibility === false ? (
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
            <p
              className="loginForgotPassword"
              onClick={() => setForgotPassVisibility(true)}
            >
              Forgot your password?
            </p>
            <button className="log_regButton" onClick={() => submitData()}>
              Log in
            </button>
          </div>
        </div>
      ) : (
        <div className="log_regPage">
          <ErrorModal
            message={errorMessage}
            openModal={openErrorModal}
            closeModal={() => setOpenErrorModal(false)}
          />
          <div className="forgotPasswordMenu">
            <p className="forgotPasswordDesc">
              Enter your login username. A 6 digit recovery code will be sent to
              that user's mail for the password recovery
            </p>
            <input
              className="forgotPasswordInput"
              type="text"
              placeholder="Enter your username"
              value={recoveryUsername}
              required
              onChange={(e) => setRecoveryUsername(e.target.value)}
            />
            <button className="forgotPasswordButton" onClick={() => sendMail()}>
              Send
            </button>
            <div className="forgotPasswordLine" />
            {recoveryCodeVisibility === true && (
              <div>
                <input
                  className="recoveryCodeInput"
                  type="password"
                  placeholder="Recovery code"
                  value={recoveryCode}
                  required
                  onChange={(e) => setRecoveryCode(e.target.value)}
                />
                <button className="forgotPasswordButton">Check</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
