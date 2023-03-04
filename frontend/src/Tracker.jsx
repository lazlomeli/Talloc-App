import React from "react";
import { OverallPie } from "./charts/OverallPie";
import DashboardSideBar from "./DashboardSideBar";
import DashboardTopBar from "./DashboardTopBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Tracker = () => {
  const userSession = localStorage.getItem("talloc_username");

  return (
    <section className="dashboardPage">
      <DashboardTopBar />
      <DashboardSideBar />
      <section className="trackerPanel">
        <section className="mainTracker">
          <h1 className="statsTitle">Tracker Statistics</h1>
        </section>
        <section className="trackerOverall">
          <h1 className="statsTitle">Overall Statistics</h1>
          <div className="overallLine"></div>
          <p className="overallDesc">
            This graph represents your overall statistics regarding the number
            of created tasks within Talloc
          </p>
          <div className="overallChart">
            <OverallPie userSession={userSession} />
          </div>
        </section>
      </section>
    </section>
  );
};
