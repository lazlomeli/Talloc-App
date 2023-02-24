import React from "react";

export const InfoModal = ({ message, openModal, closeModal }) => {
  if (!openModal) return null;
  return (
    <div className="infoModal" onClick={() => closeModal()}>
      <p className="infoModalMessage">{message}</p>
    </div>
  );
};
