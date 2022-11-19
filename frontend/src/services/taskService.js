const API_URL = 'http://localhost:8002/tasks'

export async function getAllTasks() {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
