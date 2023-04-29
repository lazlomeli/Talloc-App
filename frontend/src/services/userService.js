import axios from "axios";

axios.defaults.withCredentials = true;

export const getUser = async (user, url) => {
  try {
    const response = await fetch(`${url}/${user}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logIn = (user, url) => {
  return axios.post(`${url}/login`, user);
};

export const registerUser = (user, url) => {
  return axios.post(`${url}/register`, user);
};

export function getGithubRepos(username, url) {
  return axios.get(`${url}/github/${username}`);
}

export const clearCookieToken = (url) => {
  return axios.get(`${url}/logout`);
};

export const encryptSession = (username, url) => {
  return axios.post(`${url}/encrypt`, username);
};

export const decryptSession = (username, url) => {
  return axios.post(`${url}/decrypt`, username);
};
