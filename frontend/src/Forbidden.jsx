import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MessagesContext } from "./services/MessagesContext";

export const Forbidden = () => {
  const navigateTo = useNavigate();
  const messages = useContext(MessagesContext);

  return (
    <div className="log_regPage">
      <h1 className="forbiddenTitle">Error 403 Forbidden:</h1>
      <p className="forbiddenDesc">
        You are not allowed to access this site without logging in
      </p>
      <p
        className="forbiddenGoBack"
        onClick={() => navigateTo(`${messages.ENDPOINT.ROOT}`)}
      >
        Go back
      </p>
    </div>
  );
};
