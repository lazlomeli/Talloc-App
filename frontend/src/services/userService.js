import axios from 'axios';
const API = "http://127.0.0.1:8002/users"

export function getAllUsers() {
    axios.get(API).then(resp => {
        resp.send(resp.data)
        console.log(resp.data)
    })
}   

export function logIn() {
    console.log()
}