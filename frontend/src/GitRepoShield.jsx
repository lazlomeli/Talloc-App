import React from "react";
import { GitLogoIcon } from "./icon_components/GitHubLogoIcon";

export const GitRepoShield = ({ repositoryName }) => {
  return (
    <div className="moreInfoMidLeftGit">
      <GitLogoIcon color={"#00c5a1"} w={"25"} h={"25"} />
      <label className="midLeftGitName">{repositoryName}</label>
    </div>
  );
};
