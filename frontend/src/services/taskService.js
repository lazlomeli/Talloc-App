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

export const calculatePercentage = (tasks, lang) => {
  let taskCounter = countLanguageTasks(tasks, lang);
  return Math.floor((taskCounter / tasks.length) * 100);
};

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
  sameLanguageTasks.sort((a, b) => (a.time_spent > b.time_spent ? -1 : 1));
  return sameLanguageTasks[0];
}

export function getLanguageTotalHours(tasks, language) {
  const sameLanguageTasks = getSameLanguageTasks(tasks, language);
  const arrayOfHours = sameLanguageTasks.map((task) => task.time_spent);
  return arrayOfHours.reduce((partialSum, a) => partialSum + a, 0);
}

export function getAllHours(tasks) {
  const arr = [];
  tasks.forEach((task) => {
    arr.push(task.time_spent);
  });
  return arr;
}

export function getTasksByStatus(tasks, status) {
  const arr = tasks.filter((task) => {
    if (task.status === status) {
      return true;
    } else {
      return false;
    }
  });
  return arr;
}

export function getRepoWithMostTasks(tasks) {
  const repoNames = tasks.map((task) => task.repository_name);
  let i = 0;

  while (i < repoNames.length) {
    if (repoNames[i] === "None") {
      repoNames.splice(i, 1);
    } else {
      ++i;
    }
  }

  return repoNames
    .sort(
      (a, b) =>
        repoNames.filter((v) => v === a).length -
        repoNames.filter((v) => v === b).length
    )
    .pop();
}

export function getRepoTasks(tasks, repoName) {
  const arr = tasks.filter((task) => {
    if (task.repository_name === repoName) {
      return true;
    } else {
      return false;
    }
  });
  return arr;
}

export function getUsedRepos(tasks) {
  const arr = [];
  tasks.map((task) => {
    if (task.repository_name !== "None") {
      arr.push(task.repository_name);
    }
  });
  return arr;
}

export const isMostUsedLanguage = (tasks, language) => {
  const langs = tasks.map((task) => task.programming_language);
  const muLang = langs.sort((a, b) => {
    langs.filter((v) => v === b).length - langs.filter((v) => v === a).length;
  })[0];

  return muLang === language ? true : false;
};
