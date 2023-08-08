<template>
  <main class="auth-wrapper">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <h1>
        <span>ToeDoe</span>
        <strong>List</strong>
      </h1>
      <h2 class="h3 mb-4 fw-normal">Please sign in</h2>
      <div class="form-floating mb-2">
        <input
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors.email || errors.Error }"
          id="email"
          v-model="form.email"
          placeholder="Enter your email"
        />
        <label for="email">Email</label>
        <div class="invalid-feedback" v-if="errors.email">{{ errors?.email[0] }}</div>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password || errors.Error }"
          id="password"
          v-model="form.password"
          placeholder="Enter your password"
        />
        <label for="password">Password</label>
        <div class="invalid-feedback" v-if="errors?.password">
          {{ errors?.password[0] }}
        </div>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <div class="text-error" v-if="errors?.Error">
        {{ errors?.Error[0] }}
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { userAuthStore } from '../stores/auth.jsx'
const router = useRouter()
const store = userAuthStore()
const { handleLogin } = store
const { errors } = storeToRefs(store)

const form = reactive({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  await handleLogin(form)
  router.push('/tasks')
  // await store.fetchUser()
}
</script>

<style scoped>
.auth-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 60vh;
  margin-top: 2rem;
}
.auth-form {
  width: 400px;
}
.text-error {
  color: red;
}
</style>
