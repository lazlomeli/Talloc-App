import axios from "axios";

const API_URL = "http://localhost:8002";
const TASK_API_URL = "http://localhost:8002/tasks";

axios.defaults.withCredentials = true;

export function getAllTasks() {
  return axios.get(TASK_API_URL);
}

export function getUserTasks(username) {
  return axios.get(`${TASK_API_URL}/${username}`);
}

export function postTask(task) {
  return axios.post(`${TASK_API_URL}`, task);
}

export function updateTask(id, task) {
  return axios.put(`${TASK_API_URL}/${id}`, task);
}

export function deleteTaskByID(id) {
  return axios.delete(`${TASK_API_URL}/${id}`);
}

export function getGithubRepos(username) {
  return axios.post(`${API_URL}/github/${username}`);
}
