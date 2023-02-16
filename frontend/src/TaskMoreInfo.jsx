import React from "react";

export const TaskMoreInfo = ({ openMoreModal, closeMoreModal }) => {
  if (!openMoreModal) return null;
  return (
    <div className="taskMoreInfoModal" onClick={() => closeMoreModal()}></div>
  );
};
