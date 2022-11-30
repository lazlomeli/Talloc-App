import React, {useState, useEffect} from 'react'
import '../styles/App.css'
import Moment from 'moment'
import axios from 'axios'


const CreateTask = ({ open, onClose, tasks, setTasks }) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskLang, setTaskLang] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [taskStatus, setTaskStatus] = useState('')

    // const langOptions = process.env.REACT_APP_PROG_LANG.split(", ")
    const langOptions = ["Select the language", "Python", "Java", "JavaScript"]

    const newTask = {
        title: taskTitle,
        programming_language: taskLang,
        start_date: startDate,
        end_date: endDate,
        status: taskStatus
    }

    useEffect(() => {
        const formatDate = Moment().format('MMM Do YYYY')
        setStartDate(formatDate)
        setTaskStatus('On Going')
    }, [newTask])

    async function createTask() {
        onClose()

        if(newTask.programming_language === 'Select the language') {
            console.log("Choose a valid language")
        } else {
            axios.post('http://localhost:8002/tasks', newTask)
            .then((resp) => {
                setTasks([...tasks, resp.data])
                setTaskTitle("")
                setTaskLang("Select the language")
            })
            .catch((err) => console.log(err))
        }
    }

    if (!open) return null
    return (
        <div className="modal">
            <div onClick={ onClose } className="overlay">
                <div
                    onClick={ (e) => e.stopPropagation() }
                    className="modalContainer">
                    <p onClick={ onClose } className="modalClose">x</p>
                    <form
                    className="modalForm"
                    onSubmit={ (e) => createTask(e) }
                    >
                        <label htmlFor="taskTitle" className="modalLabel">
                            Task title:
                            <input 
                                name="taskTitle"
                                type="text"
                                placeholder="Enter the task title"
                                value={ taskTitle }
                                onChange={ (e) => setTaskTitle(e.target.value) }
                                required />
                        </label>
                        <label className="modalLabel">
                            Language:
                            <select
                                value={ taskLang }
                                onChange={ (e) => setTaskLang(e.target.value) }>
                                {langOptions.map((option) => (
                                    <option key={option}>{ option }</option>
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
                        {/* GitHub Repository */}
                    </form>
                </div>
            </div>
        </div>
  )
}

export default CreateTask