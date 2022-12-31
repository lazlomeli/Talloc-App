import React, { useEffect, useState } from 'react'
import * as API from './services/taskService'

function getLanguages(tasks) {
    let languages = []
    let uniqueLangs = []

    tasks.map(task => {
        languages.push(task.programming_language)
    })
    uniqueLangs = [...new Set(languages)]
    return uniqueLangs
}

function countLanguageTasks(tasks, language) {
    const count = tasks.filter(task => {
        if (task.programming_language == language) {
          return true;
        }
        return false;
      }).length;
      return count
}

const calculatePercentage = (tasks, lang) => {
    let taskCounter = countLanguageTasks(tasks, lang)
    return Math.floor((taskCounter/tasks.length)*100)
}

const Insights = () => {

    const [tasks, setTasks] = useState([])
    const [langs, setLangs] = useState([])
    const [modal, setModal] = useState(false)
    const [selectedLang, setSelectedLang] = useState('')

    const toggleInsightsModal = (lang) => {
        setModal(!modal)
        setSelectedLang(lang)
    }

    useEffect(() => {
        API.getAllTasks().then((resp) => {
            setTasks(resp.data)
        })
    }, [])

    useEffect(() => {
        setLangs(getLanguages(tasks))
    }, [tasks])

  return (
    <>
        <div className="insightsBackground">
        {langs.length > 0 ? (
            langs.map(lang => (
            <section 
            title="Click to view more" 
            className="insightsContainer" 
            onClick ={() => toggleInsightsModal(lang)} 
            key={lang}
            >
                <div className="insightsPhotoAndLang">
                    <img className="insightsLangLogo" src={`../static/${lang}.png`}/>
                    <h2 className="insightsLang">{lang}</h2>
                </div>
                <p className="insightsCounter">{countLanguageTasks(tasks, lang)} task(s)</p>
            </section>
            ))
        ) : (
            <section className="insightsEmpty">
                <h1 className="insightsEmptyTitle">Wow, it's very quiet around here</h1>
                <p className="insightsEmptyDesc">Create your first task to view it's insights</p>
            </section>
        )
        }
        </div>
        {modal && (
            <div className="'modal'">
                <div className="overlay" onClick={() => toggleInsightsModal()}/>
                <div className="insightsModal">
                    <img onClick={() => toggleInsightsModal()} className="modalClose" src={"../static/cross.png"}/>
                    <h1 className="insightsModalTitle">{selectedLang} Insights:</h1>
                    <div className="insightsModalLine"/>
                    <p className="insightsModalDesc">Your {selectedLang} tasks make up the  
                    <span style={{color: "#00a586", fontWeight: "bold"}}> {calculatePercentage(tasks, selectedLang)}% </span>
                     of your total tasks 
                    </p>
                    <p className="insightsModalDescSub">Task's info:</p>
                    <div className="insightsModalMainPanel">
                        {tasks.filter(task => task.programming_language === selectedLang)
                        .map(filteredTask => (
                            <section className="mainPanelTaskInfo">
                                <h1 className="mainPanelTaskInfoTitle">Title: <span className="mainPanelTaskInfoTitle-task">{filteredTask.title}</span></h1>
                                {filteredTask.status === "ON GOING" ? (
                                    <p className="mainPanelTaskInfoStatus">Status: <span className="status-ong">{filteredTask.status}</span></p>
                                ) : (
                                    <p className="mainPanelTaskInfoStatus">Status: <span className="status-com">{filteredTask.status}</span></p>
                                )}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default Insights