import React, {useState, useEffect} from 'react'
import '../styles/App.css'
import Moment from 'moment'
import axios from 'axios'
import * as API from './services/taskService'


const CreateTask = ({ open, onClose, tasks, setTasks, session_u, repositories }) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskLang, setTaskLang] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    const [repositoryName, setRepositoryName] = useState('')

    const langOptions = import.meta.env.VITE_PROG_LANGS.split(", ")

    const newTask = {
        title: taskTitle,
        programming_language: taskLang,
        start_date: startDate,
        end_date: endDate,
        status: taskStatus,
        created_by: session_u.user,
        repository_name: repositoryName
    }

    useEffect(() => {
        const formatDate = Moment().format('MMM Do YYYY')
        setStartDate(formatDate)
        setTaskStatus('ON GOING')
    }, [newTask])

    async function createTask() {
        if(
            (newTask.programming_language === 'Select the language' ||
            newTask.programming_language === '') && 
            (newTask.repository_name === 'Select your repository' ||
            newTask.repository_name === '')
            ) {
            alert('Choose valid data')
        } else {
            axios.post('http://localhost:8002/tasks', newTask)
            .then((resp) => {
                setTasks([...tasks, resp.data])
                setTaskTitle("")
                setTaskLang("Select the language")
            })
            .catch((err) => console.log(err))
        }
        onClose()
    }

    if (!open) return null
    return (
        <div className="modal">
            <div onClick={ onClose } className="overlay">
                <div
                    onClick={ (e) => e.stopPropagation() }
                    className="modalContainer">
                    <img onClick={ onClose } className="modalClose" src={"../static/cross.png"}/>
                    <form
                    className="modalForm"
                    onSubmit={ (e) => createTask(e) }
                    >
                        <label htmlFor="taskTitle" className="modalLabel">
                            <p className="modalLabelName">Task title:</p>
                            <input 
                                name="taskTitle"
                                type="text"
                                placeholder="Enter the task title"
                                className="modalInput"
                                value={ taskTitle }
                                onChange={ (e) => setTaskTitle(e.target.value) }
                                required />
                        </label>
                        <label className="modalLabel">
                            <p className="modalLabelName">Language:</p>
                            <select
                                value={ taskLang }
                                className="modalSelect"
                                onChange={ (e) => setTaskLang(e.target.value) }>
                                {langOptions.map((option) => (
                                    <option key={option}>{ option }</option>
                                ))}
                            </select>
                        </label>
                        <label className="modalLabel">
                            <p className="modalLabelName">GitHub Repository:</p>
                            <select
                                value={ taskLang }
                                className="modalSelect"
                                onChange={ (e) => setRepositoryName(e.target.value) }
                                >
                                {repositories.map((repo) => (
                                    <option key={repo}>{ repo }</option>
                                ))}
                            </select>
                        </label>
                        <label className="modalLabel">
                            <input 
                                type="submit"
                                value="Create Task"
                                className="submitCreateTask"
                                />
                        </label>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default CreateTask