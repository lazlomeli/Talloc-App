import React from "react";
import { GitLogoIcon } from "./icon_components/GitHubLogoIcon";

export const GitRepoShield = ({ userSession, repositoryName }) => {
  const goToRepo = () => {
    window.open(`https://github.com/${userSession}/${repositoryName}`);
  };
  return (
    <div className="moreInfoMidLeftGit" onClick={() => goToRepo()}>
      <GitLogoIcon color={"#00c5a1"} w={"25"} h={"25"} />
      <label className="midLeftGitName">{repositoryName}</label>
    </div>
  );
};
