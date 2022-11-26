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
    <>
    {langs.map(lang => (
        <section title="Click to view more" className="insightsContainer" key={lang}>
            <h2 className="insightsLang">{lang}</h2>
            <p className="insightsCounter">{countLanguageTasks(tasks, lang)} tasks</p>
        </section>
        ))
    }
    </>
  )
}

export default Insights