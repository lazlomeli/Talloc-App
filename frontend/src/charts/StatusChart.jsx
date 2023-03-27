import React from "react";
import { HexagonIcon } from "../icon_components/HexagonIcon";
import { StatusBarChart } from "./StatusBarChart";

export const StatusChart = ({ userSession, tasks, setTasks }) => {
  return (
    <section className="statusGraph">
      <div className="trackerHoursTitle">
        <HexagonIcon />
        <p className="trackerHours_Desc">
          <strong>Completed</strong> and <strong>Uncompleted</strong> tasks:
        </p>
      </div>
      <div className="statusBarChart">
        <StatusBarChart tasks={tasks} setTasks={setTasks} />
      </div>
    </section>
  );
};
