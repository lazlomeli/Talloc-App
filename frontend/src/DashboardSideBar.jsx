import React, { useState, useEffect, useContext } from "react";
import LogoutIcon from "./icon_components/LogoutIcon";
import { useNavigate } from "react-router-dom";
import * as userAPI from "./services/userService";
import { MessagesContext } from "./services/MessagesContext";

const DashboardSideBar = () => {
  const [userSession, setUserSession] = useState("");
  const navigateTo = useNavigate();
  const messages = useContext(MessagesContext);

  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL;
  const githubUsername = localStorage.getItem(
    messages.LOCAL_STORAGE.GITHUB_USERNAME
  );

  useEffect(() => {
    const tokenizedUsername = localStorage.getItem(
      messages.LOCAL_STORAGE.TALLOC_USERNAME
    );
    userAPI
      .decryptSession({ username: tokenizedUsername }, GATEWAY_API_URL)
      .then((resp) => {
        setUserSession(resp.data);
      })
      .catch((err) => console.log("ERROR: ", err));
  }, []);

  return (
    <div className="dashboardSide">
      <h1 className="dashboardSideTitle">Welcome, {userSession}</h1>
      <p className="dashboardSideDesc">Click to navigate:</p>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo(`${messages.ENDPOINT.DASHBOARD}`)}
      >
        <p className="dashboardSideBoxOption">Dashboard</p>
      </section>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo(`${messages.ENDPOINT.INSIGHTS}`)}
      >
        <p className="dashboardSideBoxOption">Insights</p>
      </section>
      <section
        className="dashboardSideBox"
        onClick={() => navigateTo(`${messages.ENDPOINT.TRACKER}`)}
      >
        <p className="dashboardSideBoxOption">Tracker</p>
      </section>
      {githubUsername && (
        <section
          className="dashboardSideBoxPAT"
          onClick={() => navigateTo(`${messages.ENDPOINT.UPDATE_PAT}`)}
        >
          <p className="dashboardSideBoxOptionPAT">Update PAT</p>
        </section>
      )}
      <LogoutIcon />
    </div>
  );
};

export default DashboardSideBar;
