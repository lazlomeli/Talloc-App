import axios from "axios"

const API_URL = 'http://localhost:8002/tasks'
const GH_API = 'https://api.github.com'

export function getAllTasks() {
    return axios.get(API_URL)
}

export function getUserTasks(username) {
    return axios.get(`${API_URL}/${username}`)
}

export function getGithubRepos(username) {
    return axios.get(`${GH_API}/users/${username}/repos`)
}