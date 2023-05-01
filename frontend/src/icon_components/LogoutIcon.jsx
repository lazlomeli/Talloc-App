import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as userAPI from "../services/userService";
import { MessagesContext } from "../services/MessagesContext";

const LogoutIcon = () => {
  const navigateTo = useNavigate();
  const messages = useContext(MessagesContext);

  const GATEWAY_API_URL = import.meta.env.VITE_GATEWAY_API_URL;

  function logout() {
    userAPI.clearCookieToken(GATEWAY_API_URL);
    localStorage.removeItem(messages.LOCAL_STORAGE.TALLOC_USERNAME);
    localStorage.removeItem(messages.LOCAL_STORAGE.REPOS);
    localStorage.removeItem(messages.LOCAL_STORAGE.GITHUB_USERNAME);
    navigateTo(`${messages.ENDPOINT.ROOT}`);
  }
  return (
    <section className="logout" title="Log out" onClick={() => logout()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#fffffc"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="logoutLogo"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M7 12h14l-3 -3m0 6l3 -3" />
      </svg>
    </section>
  );
};

export default LogoutIcon;
