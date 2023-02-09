import React, { useState } from "react";
import Tasks from "./Tasks";
import DashboardTopBar from "./DashboardTopBar";
import { useNavigate } from "react-router-dom";
import DashboardSideBar from "./DashboardSideBar";

export const Dashboard = () => {
  const userSession = localStorage.getItem("talloc_username");

  return (
    <section className="dashboardPage">
      <DashboardTopBar />
      <DashboardSideBar />
      <Tasks userSession={userSession} />
    </section>
  );
};
