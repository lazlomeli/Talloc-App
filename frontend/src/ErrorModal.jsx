import React from "react";

export const ErrorModal = ({ message, openModal, closeModal }) => {
  if (!openModal) return null;
  return (
    <div className="errorModal" onClick={() => closeModal()}>
      <p className="errorModalMessage">{message}</p>
    </div>
  );
};
