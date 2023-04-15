import axios from "axios";

// const API_URL = "http://localhost:8002";
// const USER_API = "http://localhost:8002/users";
// const API_URL = "http://gateway_api:8002";
const USER_API = "http://localhost:8002/users";

axios.defaults.baseURL = 'http://localhost:8002'
axios.defaults.withCredentials = true

export async function getUser(user) {
  try {
    const response = await fetch(`${USER_API}/${user}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function logIn(user) {
  return axios.post('/login', user);
}

export function registerUser(user) {
  return axios.post('/register', user);
}

export function clearCookieToken() {
  return axios.get('/logout');
}
