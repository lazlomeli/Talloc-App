import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MessagesContext } from "./services/MessagesContext";

export const MainPage = () => {
  const messages = useContext(MessagesContext);

  return (
    <div className="mainPage">
      <div className="mainPage_Logo">
        <img className="tallocLogo" src="../static/talloc.png" />
        <h1 className="tallocTitle">Talloc</h1>
        <p className="tallocDesc">Think. Plan. Achieve.</p>
      </div>
      <div className="mainPage_Container">
        <div className="mainPage_Info">
          <p>
            <span className="greenWord">Talloc</span> is a task management
            application that works with the GitHub developers API
          </p>
          <p>
            <span className="greenWord">Create Tasks</span> to manage your work
            and collect their statistics for a more in depth{" "}
            <span className="greenWord">tracing.</span>
          </p>
        </div>
        <div className="mainPage_Menu">
          <h1 className="menuTitle">Get started</h1>
          <div className="menuLine" />
          <p className="logReg">
            Already have an account?
            <Link className="logReg_ref" to={messages.ENDPOINT.LOGIN}>
              {" "}
              Log in
            </Link>
          </p>
          <p className="logReg">
            New to Talloc?
            <Link className="logReg_ref" to={messages.ENDPOINT.REGISTER}>
              {" "}
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
