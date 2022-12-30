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

const Insights = () => {

    const [tasks, setTasks] = useState([])
    const [langs, setLangs] = useState([])

    useEffect(() => {
        API.getAllTasks().then((resp) => {
            setTasks(resp.data)
        })
    }, [])

    useEffect(() => {
        setLangs(getLanguages(tasks)) 
    }, [tasks])

  return (
    <div className="insightsBackground">
    {langs.length > 0 ? (
        langs.map(lang => (
        <section title="Click to view more" className="insightsContainer" key={lang}>
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
  )
}

export default Insights