import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessagesContext } from "./services/MessagesContext";
import { ErrorModal } from "./ErrorModal";
import { InfoModal } from "./InfoModal";
import * as userAPI from "./services/userService";
import { Forbidden } from "./Forbidden";
import { ErrorContext } from "./services/ErrorContext";
import { InfoContext } from "./services/InfoContext";
import { LoadingContext } from "./services/LoadingContext";
import { Oval } from "react-loader-spinner";

export const UpdatePAT = () => {
  const [PAT, setPAT] = useState("");
  const [userSession, setUserSession] = useState("");
  const navigateTo = useNavigate();
  const messages = useContext(MessagesContext);
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);
  const { openInfoModal, setOpenInfoModal } = useContext(InfoContext);
  const { infoMessage, setInfoMessage } = useContext(InfoContext);
  const { infoModalHandler } = useContext(InfoContext);
  const { loadingVisibility, setLoadingVisibility } =
    useContext(LoadingContext);

  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL;
  const USER_API_URL = import.meta.env.VITE_USER_API_URL;

  const updateOptions = {
    update_query: { github_pat: PAT },
    username: userSession,
  };

  useEffect(() => {
    setLoadingVisibility(true);
    setTimeout(() => {
      const tokenizedUsername = localStorage.getItem(
        messages.LOCAL_STORAGE.TALLOC_USERNAME
      );
      userAPI
        .decryptSession({ username: tokenizedUsername }, GATEWAY_API_URL)
        .then((resp) => {
          setUserSession(resp.data);
        })
        .catch((err) => console.log("ERROR: ", err));
      setLoadingVisibility(false);
    }, 150);
  }, []);

  const showTokenTutorial = () => {
    window.open(
      `https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/`
    );
  };

  const validatePAT = (token) => {
    if (token === (null || undefined || messages.UX.EMPTY_STRING)) {
      errorModalHandler(messages.ERRORS.WRONG_PAT);
    }

    if (token.startsWith("github_pat_") && token.length === 93) {
      setLoadingVisibility(true);
      setTimeout(() => {
        infoModalHandler(messages.INFO.UPDATE_PAT);
        userAPI.updateUser(updateOptions, USER_API_URL);
        setLoadingVisibility(false);
      }, 500);
    } else {
      errorModalHandler(messages.ERRORS.WRONG_PAT);
    }
  };

  return (
    <>
      {userSession === null ? (
        <Forbidden />
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
          <div className="updatePAT">
            <h1 className="updatePATtitle">
              Enter your GitHub Personal Access Token:
            </h1>
            <div>
              <input
                className="updatePATInput"
                placeholder="github_pat_..."
                onChange={(e) => setPAT(e.target.value)}
              />
              <button
                className="updatePATbutton"
                onClick={() => validatePAT(PAT)}
              >
                Update
              </button>
            </div>
            <p className="updatePATInputDescription">
              You don't have a fine-grained GitHub PAT?{" "}
              <span
                className="updatePATGenerate"
                onClick={() => showTokenTutorial()}
              >
                Generate your fine-grained token
              </span>
            </p>
          </div>
          <p
            className="goBackPAT"
            onClick={() => navigateTo(`${messages.ENDPOINT.DASHBOARD}`)}
          >
            Go back
          </p>
          <Oval
            height={80}
            width={80}
            color="#00a586"
            wrapperStyle={{}}
            wrapperClass="loadingSpinner"
            visible={loadingVisibility}
            ariaLabel="oval-loading"
            secondaryColor="#074b3e"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          {loadingVisibility && (
            <div className="overlay" style={{ zIndex: 2 }} />
          )}
        </div>
      )}
    </>
  );
};
