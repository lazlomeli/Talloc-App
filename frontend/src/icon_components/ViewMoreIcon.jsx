import React from "react";

export const ViewMoreIcon = ({
  color,
  w,
  h,
  task,
  setOpenMoreModal,
  setPersistedTask,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="taskViewMore"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={() => {
        setOpenMoreModal(true);
        setPersistedTask(task);
      }}
    >
      <title>View more</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="2" />
      <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
    </svg>
  );
};
