import React from 'react'
import '../styles/App.css'

const CreateTask = ({ open, onClose }) => {

    const langOptions = ['Python', 'JavaScript', 'Java', 'C/C++', 'Ruby']

    if (!open) return null
    return (
        <div className="modal">
            <div onClick={ onClose } className="overlay">
                <div
                    onClick={ (e) => e.stopPropagation() }
                    className="modalContainer">
                    <p onClick={ onClose } className="modalClose">x</p>
                    <form className="modalForm">
                        <label htmlFor="taskTitle" className="modalLabel">
                            Task title:
                            <input 
                                name="taskTitle"
                                type="text"
                                placeholder="Enter the task title"
                                required />
                        </label>
                        <label className="modalLabel">
                            Language:
                            <select>
                                {langOptions.map(option => (
                                    <option>{ option }</option>
                                ))}
                            </select>
                        </label>
                        <label className="modalLabel">
                            <input 
                                type="submit"
                                value="Create Task"
                                className="submitCreateTask" />
                        </label>
                        {/* GitHub Repository */}
                    </form>
                </div>
            </div>
        </div>
  )
}

export default CreateTask