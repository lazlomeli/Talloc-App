import axios from "axios";

axios.defaults.withCredentials = true;

export const getUser = (user, url) => {
  return axios.get(`${url}/${user}`);
};

export const logIn = (user, url) => {
  return axios.post(`${url}/login`, user);
};

export const registerUser = (user, url) => {
  return axios.post(`${url}/register`, user);
};

export const getGithubRepos = (tallocUsername, githubUsername, url) => {
  return axios.post(`${url}/github/${githubUsername}`, tallocUsername);
};

export const clearCookieToken = (url) => {
  return axios.get(`${url}/logout`);
};

export const encryptSession = (username, url) => {
  return axios.post(`${url}/encrypt`, username);
};

export const decryptSession = (username, url) => {
  return axios.post(`${url}/decrypt`, username);
};

export const updatePAT = (tokenAndUser, url) => {
  return axios.patch(`${url}/${tokenAndUser.username}`, tokenAndUser);
};

export const recoverUser = (user, url) => {
  return axios.get(`${url}/${user}`);
};
