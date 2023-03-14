import React, { useState, useEffect } from "react";
import { OverallPie } from "./charts/OverallPie";
import DashboardSideBar from "./DashboardSideBar";
import DashboardTopBar from "./DashboardTopBar";
import * as taskAPI from "../src/services/taskService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { HoursLineGraph } from "./charts/HoursLineGraph";
import { StatusChart } from "./charts/StatusChart";
import { TrackerRepo } from "./TrackerRepo";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Tracker = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskAPI.getUserTasks(userSession).then((resp) => setTasks(resp.data));
  }, []);

  const userSession = localStorage.getItem("talloc_username");

  return (
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
          <TrackerRepo tasks={tasks} />
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
          <StatusChart
            userSession={userSession}
            tasks={tasks}
            setTasks={setTasks}
          />
        </section>
      </section>
    </section>
  );
};
