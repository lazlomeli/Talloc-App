import axios from "axios";

const API_URL = "http://localhost:8002";
const USER_API = "http://localhost:8002/users";

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
  return axios.post(`${API_URL}/login`, user, { withCredentials: true });
}

export function registerUser(user) {
  return axios.post(`${API_URL}/register`, user);
}

export function clearCookieToken() {
  return axios.post(`${API_URL}/logout`);
}
