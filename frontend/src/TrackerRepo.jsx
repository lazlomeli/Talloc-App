import React from "react";
import { GitRepoShield } from "./GitRepoShield";
import { HexagonIcon } from "./icon_components/HexagonIcon";
import { DiamondIcon } from "./icon_components/DiamondIcon";
import * as taskAPI from "../src/services/taskService";

export const TrackerRepo = ({ tasks }) => {
  const repoWithMostTasks = taskAPI.getRepoWithMostTasks(tasks);
  const repoTasks = taskAPI.getRepoTasks(tasks, repoWithMostTasks).length;
  const repoNames = taskAPI.getUsedRepos(tasks);
  console.log(repoNames);

  return (
    <section>
      <div className="trackerHoursTitle">
        <HexagonIcon />
        <p className="trackerHours_Desc">
          Repository contribution information:
        </p>
      </div>
      <div className="trackerRepo">
        <h1 className="trackerRepoMost">Most task-contributed repository:</h1>
        <GitRepoShield repositoryName={repoWithMostTasks} />
        <div className="trackerRepoInfo">
          <DiamondIcon w={"12"} h={"12"} color={"#02c8a5"} />
          <p className="trackerRepoInfoDesc">
            Linked tasks:{" "}
            <span className="trackerRepoInfoDescImp">{repoTasks}</span>
          </p>
        </div>
        <div className="trackerRepoInfo">
          <DiamondIcon w={"12"} h={"12"} color={"#02c8a5"} />
          <p className="trackerRepoInfoDesc">
            You created <span className="trackerRepoInfoDescImp">0</span> tasks
            to this repo in the past 7 days
          </p>
        </div>
        <div className="trackerRepoLine" />
        <div className="trackerRepoOther">
          <h1 className="trackerRepoOtherTitle">View other repository:</h1>
          <select className="trackerRepoOtherSelect">
            {repoNames.map((repo) => (
              <option>{repo}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
