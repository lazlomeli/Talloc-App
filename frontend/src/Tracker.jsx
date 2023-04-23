import React, { useState, useEffect } from "react";
import { OverallPie } from "./charts/OverallPie";
import DashboardSideBar from "./DashboardSideBar";
import DashboardTopBar from "./DashboardTopBar";
import * as taskAPI from "../src/services/taskService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { HoursLineGraph } from "./charts/HoursLineGraph";
import { StatusChart } from "./charts/StatusChart";
import { OverallRadar } from "./charts/OverallRadar";
import { TrackerRepo } from "./TrackerRepo";
import { Forbidden } from "./Forbidden";
import * as userAPI from './services/userService'

ChartJS.register(ArcElement, Tooltip, Legend);

export const Tracker = () => {
  const [tasks, setTasks] = useState([]);
  const [userSession, setUserSession] = useState('')

  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL
  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL

  useEffect(() => {
    const tokenizedUsername = localStorage.getItem("talloc_username")
    userAPI.decryptSession({ username: tokenizedUsername }, GATEWAY_API_URL)
    .then((resp) => {
      setUserSession(resp.data)
    })
    .catch((err) => console.log("ERROR: ", err))
  }, [])

  useEffect(() => {
    taskAPI.getUserTasks(userSession, TASK_API_URL).then((resp) => setTasks(resp.data));
  }, []);


  return (
    <>
    {userSession === null ? (
      <Forbidden />
    ) : (
    <section className="dashboardPage">
      <DashboardTopBar />
      <DashboardSideBar />
      <section className="trackerPanel">
        <section className="mainTracker">
          <h1 className="statsTitle">Tracker Statistics</h1>
          <div className="trackerLine" />
          <HoursLineGraph
            userSession={userSession}
            tasks={tasks}
            setTasks={setTasks}
          />
          <section className="mainTrackerBottom">
            <TrackerRepo userSession={userSession} tasks={tasks} />
            <StatusChart
              userSession={userSession}
              tasks={tasks}
              setTasks={setTasks}
            />
          </section>
        </section>
        <section className="trackerOverall">
          <h1 className="statsTitle">Overall Statistics</h1>
          <div className="overallLine" />
          <p className="overallDesc">
            This graph represents your overall statistics regarding the number
            of created tasks within Talloc
          </p>
          <div className="overallChart">
            <OverallPie
              userSession={userSession}
              tasks={tasks}
              setTasks={setTasks}
            />
          </div>
          <div className="overallLine" />
          <OverallRadar tasks={tasks} />
        </section>
      </section>
    </section>
    )}
    </>
  );
};
