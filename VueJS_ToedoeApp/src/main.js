import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // vue-route

const app = createApp(App)
app.use(createPinia()) // add pinia
app.use(router) // vue-route
app.mount('#app')
