import React from "react";
import { useNavigate } from "react-router-dom";
import * as userAPI from "../services/userService";

const LogoutIcon = () => {
  const navigateTo = useNavigate();

  function logout() {
    userAPI.clearCookieToken();
    localStorage.removeItem("talloc_username");
    localStorage.removeItem("repositories");
    localStorage.removeItem("talloc_github_username");
    navigateTo("/");
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
