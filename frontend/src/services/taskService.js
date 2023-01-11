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