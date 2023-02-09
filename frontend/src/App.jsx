import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { MainPage } from "./MainPage";
import { Dashboard } from "./Dashboard";
import Insights from "./Insights";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </>
  );
};
