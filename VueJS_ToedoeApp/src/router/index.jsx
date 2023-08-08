import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
// import { userAuthStore } from '../stores/auth'
import Cookies from 'js-cookie'

const router = createRouter({
  routes,
  history: createWebHistory()
  //   linkActiveClass: 'active'
})

//giống middleware trong route xử lý trước khi qua route mới
router.beforeEach(async (to, from, next) => {
  // const store = userAuthStore()
  const token = Cookies.get('access_token') // Lấy token từ cookie (hoặc local storage)

  if (to.meta.auth && !token) {
    next({
      name: 'login'
      // query: {
      //   redirect: to.fullPath
      // }
    })
  } else if (token && to.name === 'login') {
    next({
      name: 'tasks'
    })
  } else {
    next() // Tiếp tục di chuyển đến trang tiếp theo nếu có store.isLogin hoặc trang không yêu cầu xác thực
  }
})

export default router
