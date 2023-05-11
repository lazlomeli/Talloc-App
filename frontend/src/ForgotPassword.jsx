import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorModal } from "./ErrorModal";
import { InfoModal } from "./InfoModal";
import { ErrorContext } from "./services/ErrorContext";
import { MessagesContext } from "./services/MessagesContext";
import { InfoContext } from "./services/InfoContext";
import * as userAPI from "./services/userService";
import { Forbidden } from "./Forbidden";

export const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const navigateTo = useNavigate();
  const { openErrorModal, setOpenErrorModal } = useContext(ErrorContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  const { errorModalHandler } = useContext(ErrorContext);
  const { openInfoModal, setOpenInfoModal } = useContext(InfoContext);
  const { infoMessage, setInfoMessage } = useContext(InfoContext);
  const { infoModalHandler } = useContext(InfoContext);
  const messages = useContext(MessagesContext);

  const RECOVERY_URL = import.meta.env.VITE_RECOVERY_URL;

  const updatePassword = () => {
    if (newPassword === repeatNewPassword) {
      const recoveryUsername = localStorage.getItem("recovery_username");
      const updateOptions = {
        update_query: { password: repeatNewPassword },
        username: recoveryUsername,
      };

      userAPI
        .updateUser(updateOptions, RECOVERY_URL)
        .then((resp) => {
          infoModalHandler(messages.INFO.PASSWORD_UPDATED);
          localStorage.removeItem("recovery_username");
          navigateTo("/login");
        })
        .catch((err) => {
          errorModalHandler(messages.ERRORS.GENERIC);
        });
    } else {
      errorModalHandler(messages.ERRORS.PASSWORDS_DONT_MATCH);
    }
  };

  return (
    <>
      {recoveryUsername === null ? (
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
          <img className="tallocLogin" src="../static/talloc.png" />
          <div className="recoveryMenu">
            <input
              className="recoveryInputs"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="recoveryInputs"
              type="password"
              placeholder="Repeat your new password"
              value={repeatNewPassword}
              required
              onChange={(e) => setRepeatNewPassword(e.target.value)}
            />
            <button className="recoveryButton" onClick={() => updatePassword()}>
              Change password
            </button>
          </div>
        </div>
      )}
    </>
  );
};
