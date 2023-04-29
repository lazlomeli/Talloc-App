import React, { useState, useEffect, useContext } from "react";
import Tasks from "./Tasks";
import DashboardTopBar from "./DashboardTopBar";
import DashboardSideBar from "./DashboardSideBar";
import { Forbidden } from "./Forbidden";
import * as userAPI from "./services/userService";
import { MessagesContext } from "./services/MessagesContext";

export const Dashboard = () => {
  const [userSession, setUserSession] = useState("");
  const messages = useContext(MessagesContext);

  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL;

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
    <>
      {userSession === null ? (
        <div>
          <Forbidden />
        </div>
      ) : (
        <section className="dashboardPage">
          <DashboardTopBar />
          <DashboardSideBar />
          <Tasks userSession={userSession} />
        </section>
      )}
    </>
  );
};
