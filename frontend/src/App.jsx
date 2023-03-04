import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { MainPage } from "./MainPage";
import { Dashboard } from "./Dashboard";
import Insights from "./Insights";
import { ErrorContext } from "./services/ErrorContext";
import { Tracker } from "./Tracker";

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
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </ErrorContext.Provider>
  );
};
