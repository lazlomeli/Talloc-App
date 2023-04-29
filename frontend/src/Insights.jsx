import React, { useEffect, useState, useContext } from "react";
import * as taskAPI from "./services/taskService";
import languages from "../langs.json";
import DashboardTopBar from "./DashboardTopBar";
import DashboardSideBar from "./DashboardSideBar";
import EmptyInsights from "./EmptyInsights";
import CrossIcon from "./icon_components/CrossIcon";
import { TaskMoreInfo } from "./TaskMoreInfo";
import { Forbidden } from "./Forbidden";
import * as userAPI from "./services/userService";
import { MessagesContext } from "./services/MessagesContext";

const Insights = () => {
  const [tasks, setTasks] = useState([]);
  const [langs, setLangs] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState("");
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [persistedTask, setPersistedTask] = useState({});
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [userSession, setUserSession] = useState("");
  const messages = useContext(MessagesContext);

  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;
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

  useEffect(() => {
    taskAPI.getUserTasks(userSession, TASK_API_URL).then((resp) => {
      setTasks(resp.data);
    });
  }, []);

  useEffect(() => {
    setLangs(taskAPI.getLanguages(tasks));
  }, [tasks]);

  const toggleInsightsModal = (lang) => {
    setModal(!modal);
    setSelectedLang(lang);
  };

  return (
    <>
      {userSession === null ? (
        <Forbidden />
      ) : (
        <section className="dashboardPage">
          <DashboardTopBar />
          <DashboardSideBar />
          <div className="insightsBackground">
            {langs.length > 0 ? (
              langs.map((lang) => (
                <section
                  title="Click to view more"
                  className="insightsContainer"
                  onClick={() => toggleInsightsModal(lang)}
                  key={languages.indexOf(lang)}
                >
                  {lang === messages.UX.CSHARP ? (
                    <div className="insightsPhotoAndLang">
                      <img
                        className="insightsLangLogo"
                        src={`../static/CSharp.png`}
                      />
                      <h2 className="insightsLang">{lang}</h2>
                    </div>
                  ) : (
                    <div className="insightsPhotoAndLang">
                      <img
                        className="insightsLangLogo"
                        src={`../static/${lang}.png`.toLowerCase()}
                      />
                      <h2 className="insightsLang">{lang}</h2>
                    </div>
                  )}
                  <p className="insightsCounter">
                    {taskAPI.countLanguageTasks(tasks, lang)} task(s)
                  </p>
                </section>
              ))
            ) : (
              <EmptyInsights />
            )}
          </div>
          {modal && (
            <div className="'modal'">
              <div className="overlay" onClick={() => toggleInsightsModal()} />
              <div className="insightsModal">
                <CrossIcon toggleModal={toggleInsightsModal} />
                <h1 className="insightsModalTitle">{selectedLang} Insights:</h1>
                <div className="insightsModalLine" />
                <p className="insightsModalDesc">
                  Your {selectedLang} tasks make up the
                  <span style={{ color: "#00a586", fontWeight: "bold" }}>
                    {" "}
                    {taskAPI.calculatePercentage(tasks, selectedLang)}%{" "}
                  </span>
                  of your total tasks
                </p>
                <p className="insightsModalDescSub">Task's info:</p>
                <div className="insightsModalMainPanel">
                  {tasks
                    .filter(
                      (task) => task.programming_language === selectedLang
                    )
                    .map((filteredTask) => (
                      <section
                        className="mainPanelTaskInfo"
                        key={filteredTask.id}
                        onClick={() => {
                          setModal(false);
                          setOpenMoreModal(true);
                          setPersistedTask(filteredTask);
                        }}
                      >
                        <p className="mainPanelTaskInfoTitles">
                          Title:{" "}
                          <span className="mainPanelTaskInfoTitle-task">
                            {filteredTask.title}
                          </span>
                        </p>
                        {filteredTask.status === "ON GOING" ? (
                          <p className="mainPanelTaskInfoTitles">
                            Status:{" "}
                            <span className="status-ong">
                              {filteredTask.status}
                            </span>
                          </p>
                        ) : (
                          <p className="mainPanelTaskInfoTitles">
                            Status:{" "}
                            <span className="status-com">
                              {filteredTask.status}
                            </span>
                          </p>
                        )}
                        <p className="mainPanelTaskInfoTitles">
                          Time spent:{" "}
                          <span className="mainPanelTaskInfoTitle-task">
                            {filteredTask.time_spent} hours
                          </span>
                        </p>
                      </section>
                    ))}
                </div>
              </div>
            </div>
          )}
          <TaskMoreInfo
            openMoreModal={openMoreModal}
            setOpenInsightsModal={setModal}
            closeMoreModal={() => setOpenMoreModal(false)}
            persistedTask={persistedTask}
            tasks={tasks}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            timeSpent={timeSpent}
            setTimeSpent={setTimeSpent}
          />
        </section>
      )}
    </>
  );
};

export default Insights;
