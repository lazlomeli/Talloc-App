import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { MainPage } from "./MainPage";
import { Dashboard } from "./Dashboard";
import Insights from "./Insights";
import { ErrorContext } from "./services/ErrorContext";
import { Tracker } from "./Tracker";
import { MessagesContext } from "./services/MessagesContext";
import messages from "../messages.json";

export const App = () => {
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const errorModalHandler = (message) => {
    setErrorMessage(message);
    setOpenErrorModal(true);
    setTimeout(() => {
      setOpenErrorModal(false);
    }, 3000);
  };

  return (
    <MessagesContext.Provider value={messages}>
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
          <Route path={messages.ENDPOINT.REGISTER} element={<RegisterPage />} />
          <Route path={messages.ENDPOINT.LOGIN} element={<LoginPage />} />
          <Route path={messages.ENDPOINT.DASHBOARD} element={<Dashboard />} />
          <Route path={messages.ENDPOINT.INSIGHTS} element={<Insights />} />
          <Route path={messages.ENDPOINT.TRACKER} element={<Tracker />} />
        </Routes>
      </ErrorContext.Provider>
    </MessagesContext.Provider>
  );
};
