const API_URL = 'http://localhost:8002/users'

export async function getUser(u) {
    try {
      const response = await fetch(`${API_URL}/${u}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
}