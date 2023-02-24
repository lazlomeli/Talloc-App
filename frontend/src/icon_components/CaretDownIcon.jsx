import React from "react";

export const CaretDownIcon = ({ closeModal }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="caretDown"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="#394047"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={() => closeModal()}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 15l-6 -6l-6 6h12" transform="rotate(180 12 12)" />
    </svg>
  );
};
