export function config() {
    const token = localStorage.getItem("talloc_user_token")
    const cfg = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    return cfg
}