import axios from "axios";
import * as env from './environment.js'

axios.defaults.baseURL = env.GATEWAY_API_URL
axios.defaults.withCredentials = true

export async function getUser(user) {
  try {
    const response = await fetch(`${env.USER_API_URL}/${user}`);
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
