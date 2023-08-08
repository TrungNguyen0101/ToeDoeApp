<template>
  <section>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div class="container py-2">
        <router-link to="/" class="navbar-brand">
          <span>Toedoe</span>
          <strong>List</strong>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- <router-link to="/tasks" class="nav-link">Tasks</router-link> -->
              <router-link :to="{ name: 'tasks' }" class="nav-link">Tasks</router-link>
              <!-- <a href="#" @click.prevent="($event) => $router.push('/tasks')" class="nav-link"
              >Tasks</a
            > -->
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'summary' }" class="nav-link">Summary</router-link>
            </li>
          </ul>

          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary ms-2"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'register' }" class="btn btn-danger ms-2"
                >Register</router-link
              >
            </li>
            <li class="nav-item">
              <button href="#" class="btn btn-outline-secondary ms-2" @click="handleLogout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="block-text">
      <span class="text" v-show="store?.user">Welcome {{ store?.user?.name }} !!!</span>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userAuthStore } from '../stores/auth.jsx'
const router = useRouter()
const store = userAuthStore()

const handleLogout = async () => {
  await store.handleLogout()
  router.push('/login')
}

onMounted(async () => {
  await store.fetchUser()
})
</script>

<style scoped>
.nav-link.router-link-active {
  color: red;
}
.navbar {
  margin-bottom: 10px;
}
.text {
  margin-right: 20px;
  color: red;
  display: block;
  text-align: right;
  font-size: 20px;
}
.block-text {
  height: 24px;
}
</style>
