import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { csrfCookie, login, register, logout, getUser } from '../http/auth-api'

export const userAuthStore = defineStore('authStore', () => {
  const user = ref(null)

  const isLogin = computed(() => !user.value)

  const fetchUser = async () => {
    const { data } = await getUser()
    console.log('file: auth.jsx:14 ~ fetchUser ~ data:', data)
    user.value = data
  }

  const handleLogin = async (credentials) => {
    await csrfCookie()
    await login(credentials)
    await fetchUser()
  }

  const handleRegister = async (newUser) => {
    await register(newUser)
    await handleLogin({
      email: newUser.email,
      password: newUser.password
    })
  }

  const handleLogout = async () => {
    await logout()
    user.value = null
  }

  return {
    user,
    isLogin,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout
  }
})
