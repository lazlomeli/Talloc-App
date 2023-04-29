import React, { useState, useContext } from "react";
import { GitRepoShield } from "./GitRepoShield";
import { HexagonIcon } from "./icon_components/HexagonIcon";
import { DiamondIcon } from "./icon_components/DiamondIcon";
import * as taskAPI from "../src/services/taskService";
import { MessagesContext } from "./services/MessagesContext";

export const TrackerRepo = ({ userSession, tasks }) => {
  const [selectedRepo, setSelectedRepo] = useState("");
  const repoWithMostTasks = taskAPI.getRepoWithMostTasks(tasks);
  const repoTasks = taskAPI.getRepoTasks(tasks, repoWithMostTasks).length;
  const repoNames = Array.from(new Set(taskAPI.getUsedRepos(tasks)));
  const messages = useContext(MessagesContext);

  return (
    <section>
      <div className="trackerHoursTitle">
        <HexagonIcon />
        <p className="trackerHours_Desc">
          Repository contribution information:
        </p>
      </div>
      <div className="trackerRepo">
        {selectedRepo === messages.UX.EMPTY_STRING ? (
          <>
            <h1 className="trackerRepoMost">
              Most task-contributed repository:
            </h1>
            <GitRepoShield
              userSession={userSession}
              repositoryName={repoWithMostTasks}
            />
            <div className="trackerRepoInfo">
              <DiamondIcon w={"12"} h={"12"} color={"#02c8a5"} />
              <p className="trackerRepoInfoDesc">
                Linked tasks:{" "}
                <span className="trackerRepoInfoDescImp">{repoTasks}</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="trackerRepoMost">{selectedRepo} repository info:</h1>
            <GitRepoShield
              userSession={userSession}
              repositoryName={selectedRepo}
            />
            <div className="trackerRepoInfo">
              <DiamondIcon w={"12"} h={"12"} color={"#02c8a5"} />
              <p className="trackerRepoInfoDesc">
                Linked tasks:{" "}
                <span className="trackerRepoInfoDescImp">
                  {taskAPI.getRepoTasks(tasks, selectedRepo).length}
                </span>
              </p>
            </div>
          </>
        )}
        <div className="trackerRepoLine" />
        <div className="trackerRepoOther">
          <h1 className="trackerRepoOtherTitle">View other repository:</h1>
          <select
            className="trackerHoursSelect"
            onChange={(e) => {
              setSelectedRepo(e.target.value);
            }}
          >
            {repoNames.map((repo, i) => (
              <option key={i}>{repo}</option>
            ))}
          </select>
        </div>
        <button
          className="viewMostContributed"
          onClick={() => setSelectedRepo("")}
        >
          View most contributed
        </button>
      </div>
    </section>
  );
};
