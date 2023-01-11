import axios from "axios"


const API_URL = 'http://localhost:8002/tasks'
const GH_API = 'https://api.github.com'


export function getAllTasks(config) {
    return axios.get(API_URL, config)
}

export function getUserTasks(username, config) {
    return axios.get(`${API_URL}/${username}`, config)
}

export function getGithubRepos(username) {
    return axios.get(`${GH_API}/users/${username}/repos`)
}

export function postTask(task, config) {
    return axios.post(`${API_URL}`, task, config)
}

export function updateTask(id, task, config) {
    return axios.put(`${API_URL}/${id}`, task, config)
}

export function deleteTaskByID(id, config) {
    return axios.delete(`${API_URL}/${id}`, config)
}