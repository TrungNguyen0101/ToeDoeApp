import axios from 'axios'
import Cookies from 'js-cookie'
axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token') // Lấy token từ cookie (hoặc local storage)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default api
