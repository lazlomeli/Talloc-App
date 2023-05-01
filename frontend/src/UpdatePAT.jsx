import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessagesContext } from "./services/MessagesContext";
import * as userAPI from "./services/userService";
import { Forbidden } from "./Forbidden";

export const UpdatePAT = () => {
  const [PAT, setPAT] = useState("");
  const [userSession, setUserSession] = useState("");
  const navigateTo = useNavigate();
  const messages = useContext(MessagesContext);

  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL;

  useEffect(() => {
    const tokenizedUsername = localStorage.getItem(
      messages.LOCAL_STORAGE.TALLOC_USERNAME
    );
    userAPI
      .decryptSession({ username: tokenizedUsername }, GATEWAY_API_URL)
      .then((resp) => {
        setUserSession(resp.data);
      })
      .catch((err) => console.log("ERROR: ", err));
  }, []);

  const showTokenTutorial = () => {
    window.open(
      `https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/`
    );
  };

  return (
    <>
      {userSession === null ? (
        <Forbidden />
      ) : (
        <div className="log_regPage">
          <div className="updatePAT">
            <h1 className="updatePATtitle">
              Enter your fine-grained GitHub PAT:
            </h1>
            <div>
              <input
                className="updatePATInput"
                placeholder="github_pat_..."
                onChange={(e) => setPAT(e.target.value)}
              />
              <button
                className="updatePATbutton"
                onClick={() =>
                  userAPI.updatePAT(
                    { token: PAT, user: userSession },
                    GATEWAY_API_URL
                  )
                }
              >
                Update
              </button>
            </div>
            <p className="updatePATInputDescription">
              You don't have a fine-grained GitHub PAT?{" "}
              <span
                className="updatePATGenerate"
                onClick={() => showTokenTutorial()}
              >
                Generate your fine-grained token
              </span>
            </p>
          </div>
          <p
            className="goBackPAT"
            onClick={() => navigateTo(`${messages.ENDPOINT.DASHBOARD}`)}
          >
            Go back
          </p>
        </div>
      )}
    </>
  );
};
