import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { MainPage } from "./MainPage";
import { Dashboard } from "./Dashboard";
import Insights from "./Insights";
import { InfoContext } from "./services/InfoContext";
import { ErrorContext } from "./services/ErrorContext";
import { LoadingContext } from "./services/LoadingContext";
import { Tracker } from "./Tracker";
import { MessagesContext } from "./services/MessagesContext";
import messages from "../messages.json";
import { UpdatePAT } from "./UpdatePAT";
import { ForgotPassword } from "./ForgotPassword";

export const App = () => {
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [loadingVisibility, setLoadingVisibility] = useState(false);

  const errorModalHandler = (message) => {
    setErrorMessage(message);
    setOpenErrorModal(true);
    setTimeout(() => {
      setOpenErrorModal(false);
    }, 3000);
  };

  const infoModalHandler = (message) => {
    setOpenInfoModal(true);
    setInfoMessage(message);
    setTimeout(() => {
      setOpenInfoModal(false);
    }, 3000);
  };

  return (
    <MessagesContext.Provider value={messages}>
      <LoadingContext.Provider
        value={{ loadingVisibility, setLoadingVisibility }}
      >
        <InfoContext.Provider
          value={{
            infoModalHandler,
            openInfoModal,
            setOpenInfoModal,
            infoMessage,
            setInfoMessage,
          }}
        >
          <ErrorContext.Provider
            value={{
              errorModalHandler,
              openErrorModal,
              setOpenErrorModal,
              errorMessage,
              setErrorMessage,
            }}
          >
            <Routes>
              <Route path={messages.ENDPOINT.ROOT} element={<MainPage />} />
              <Route
                path={messages.ENDPOINT.REGISTER}
                element={<RegisterPage />}
              />
              <Route path={messages.ENDPOINT.LOGIN} element={<LoginPage />} />
              <Route
                path={messages.ENDPOINT.FORGOT_PASSWORD}
                element={<ForgotPassword />}
              />
              <Route
                path={messages.ENDPOINT.DASHBOARD}
                element={<Dashboard />}
              />
              <Route path={messages.ENDPOINT.INSIGHTS} element={<Insights />} />
              <Route path={messages.ENDPOINT.TRACKER} element={<Tracker />} />
              <Route
                path={messages.ENDPOINT.UPDATE_PAT}
                element={<UpdatePAT />}
              />
            </Routes>
          </ErrorContext.Provider>
        </InfoContext.Provider>
      </LoadingContext.Provider>
    </MessagesContext.Provider>
  );
};
