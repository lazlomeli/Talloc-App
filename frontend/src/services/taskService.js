import axios from "axios"

const API_URL = 'http://localhost:8002/tasks'

export function getAllTasks() {
    return axios.get(API_URL)
}

export function getUserTasks(username) {
    return axios.get(`${API_URL}/${username}`)
}