import TasksPage from '../pages/TasksPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import SummaryPage from '../pages/SummaryPage.vue'
import HomePage from '../pages/HomePage.vue'
import NotFoundPage from '../pages/errors/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/tasks',
    component: TasksPage,
    name: 'tasks',
    meta: {
      auth: true
    }
  },
  {
    path: '/summary',
    component: SummaryPage,
    name: 'summary'
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'login'
  },
  {
    path: '/register',
    component: RegisterPage,
    name: 'register'
  },
  {
    path: '/:notFound(.*)',
    component: NotFoundPage,
    name: 'error.404'
  }
]

export default routes
