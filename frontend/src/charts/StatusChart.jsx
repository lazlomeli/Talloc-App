import React from "react";
import { HexagonIcon } from "../icon_components/HexagonIcon";
import { StatusBarChart } from "./StatusBarChart";

export const StatusChart = ({ userSession, tasks, setTasks }) => {
  return (
    <section className="statusGraph">
      <p className="statusGraphDesc">
        <strong>Completed</strong> vs <strong>On Going</strong> tasks
      </p>
      <div className="statusBarChart">
        <StatusBarChart tasks={tasks} setTasks={setTasks} />
      </div>
    </section>
  );
};
