import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "./ErrorModal";
import { InfoModal } from "./InfoModal";
import { ErrorContext } from "./services/ErrorContext";
import * as userAPI from "./services/userService";
import { MessagesContext } from "./services/MessagesContext";
import { ForgotPassword } from "./ForgotPassword";
import { InfoContext } from "./services/InfoContext";

export function LoginPage() {
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });
  const [githubUsername, setGithubUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [forgotPassVisibility, setForgotPassVisibility] = useState(false);
  const [recoveryUsername, setRecoveryUsername] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [recoveryCodeVisibility, setRecoveryCodeVisibility] = useState(false);
  const [recoveryMail, setRecoveryMail] = useState("");
  const navigateTo = useNavigate();
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);
  const { openInfoModal, setOpenInfoModal } = useContext(InfoContext);
  const { infoMessage, setInfoMessage } = useContext(InfoContext);
  const { infoModalHandler } = useContext(InfoContext);
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
    const code = userAPI.generateRecoveryCode();

    if (recoveryMail !== messages.UX.EMPTY_STRING) {
      userAPI
        .sendRecoveryMail(
          { email: recoveryMail, recovery_code: code },
          RECOVERY_URL
        )
        .catch((err) => console.log(err));
      infoModalHandler(messages.INFO.EMAIL_SENT);
      setGeneratedCode(code);
      setRecoveryCodeVisibility(true);
    }
  };

  const validateRecoveryCode = () => {
    if (generatedCode === recoveryCode) {
      infoModalHandler(messages.INFO.VALID_CODE);
      localStorage.setItem("recovery_username", recoveryUsername);
      navigateTo("/forgot-password");
    } else {
      errorModalHandler(messages.ERRORS.WRONG_RECOVERY_CODE);
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
          <InfoModal
            message={infoMessage}
            openModal={openInfoModal}
            closeModal={() => setOpenInfoModal(false)}
          />
          <div className="forgotPasswordMenu">
            <p className="forgotPasswordDesc">
              Enter your login username. A{" "}
              <span style={{ color: "#00c5a1" }}>6 digit recovery code</span>{" "}
              will be sent to that user's mail for the password recovery.{" "}
              <span style={{ color: "#00c5a1" }}>
                Make sure to check your Spam tray
              </span>
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
                <button
                  className="forgotPasswordButton"
                  onClick={() => validateRecoveryCode()}
                >
                  Check
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
