import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, register, logout, getUser, csrfCookie } from '../http/auth-api'
import Cookies from 'js-cookie' // Import js-cookie
import { useRouter } from 'vue-router'

export const userAuthStore = defineStore('authStore', () => {
  const router = useRouter()
  const user = ref(null)
  const errors = ref({})

  const isLogin = computed(() => user.value)

  const fetchUser = async () => {
    try {
      const { data } = await getUser()
      user.value = data
    } catch (error) {
      user.value = null
    }
  }

  const handleLogin = async (credentials) => {
    await csrfCookie()
    try {
      const { data } = await login(credentials)
      Cookies.set('access_token', data.token, { expires: 1 }) // Lưu token vào cookie và hết hạn sau 7 ngày
      await fetchUser()
      errors.value = {}
      return true
    } catch (error) {
      errors.value = error.response.data.errors
    }
  }

  const handleRegister = async (newUser) => {
    try {
      const { data } = await register(newUser)
      Cookies.set('access_token', data.token, { expires: 1 }) // Lưu token vào cookie và hết hạn sau 7 ngày
      const result = await handleLogin({
        email: newUser.email,
        password: newUser.password
      })
      if (result) {
        router.push('/tasks')
      }
    } catch (error) {
      errors.value = error.response.data.errors
    }
  }

  const handleLogout = async () => {
    await logout()
    Cookies.remove('access_token')
    user.value = null
  }

  return {
    user,
    isLogin,
    errors,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout
  }
})
