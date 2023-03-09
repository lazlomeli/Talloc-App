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

export function getLanguages(tasks) {
  let languages = [];
  let uniqueLangs = [];

  tasks.map((task) => {
    languages.push(task.programming_language);
  });
  uniqueLangs = [...new Set(languages)];
  return uniqueLangs;
}

export function getSameLanguageTasks(tasks, language) {
  const sameLanguageTasks = [];
  tasks.filter((task) => {
    task.programming_language === language
      ? sameLanguageTasks.push(task)
      : null;
  });

  return sameLanguageTasks;
}

export function countLanguageTasks(tasks, language) {
  const count = tasks.filter((task) => {
    if (task.programming_language === language) {
      return true;
    }
    return false;
  }).length;
  return count;
}

export function getHoursArrayOfEachTask(tasks, language) {
  const arrayOfHours = [];
  tasks.filter((task) => {
    if (task.programming_language === language) {
      arrayOfHours.push(task.time_spent);
    }
  });
  return arrayOfHours;
}

export function getHighestHoursTask(tasks, language) {
  const sameLanguageTasks = getSameLanguageTasks(tasks, language);
  const hoursOfTasks = sameLanguageTasks.map((task) => task.time_spent);
  hoursOfTasks.sort((a, b) => b - a);
  return hoursOfTasks[0];
}

export function getLanguageTotalHours(tasks, language) {
  const sameLanguageTasks = getSameLanguageTasks(tasks, language);
  const arrayOfHours = sameLanguageTasks.map((task) => task.time_spent);

  return arrayOfHours.reduce((partialSum, a) => partialSum + a, 0);
}
