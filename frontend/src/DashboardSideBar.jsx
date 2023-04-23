import React, { useState, useEffect } from "react";
import LogoutIcon from "./icon_components/LogoutIcon";
import { useNavigate } from "react-router-dom";
import * as userAPI from './services/userService'

const DashboardSideBar = () => {
  const [userSession, setUserSession] = useState('')
  const navigateTo = useNavigate();

  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL

  useEffect(() => {
    const tokenizedUsername = localStorage.getItem("talloc_username")
    userAPI.decryptSession({ username: tokenizedUsername }, GATEWAY_API_URL)
    .then((resp) => {
      setUserSession(resp.data)
    })
    .catch((err) => console.log("ERROR: ", err))
  }, [])

  return (
    <div className="dashboardSide">
      <h1 className="dashboardSideTitle">
        Welcome, {userSession}
      </h1>
      <p className="dashboardSideDesc">Click to navigate:</p>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo("/dashboard")}
      >
        <p className="dashboardSideBoxOption">Dashboard</p>
      </section>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo("/insights")}
      >
        <p className="dashboardSideBoxOption">Insights</p>
      </section>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo("/tracker")}
      >
        <p className="dashboardSideBoxOption">Tracker</p>
      </section>
      <LogoutIcon />
    </div>
  );
};

export default DashboardSideBar;
