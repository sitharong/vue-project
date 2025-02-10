import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLogin from '@/components/UserLogin.vue'
import UserRegister from '@/components/UserRegister.vue'
import { userService } from '@/services/UserService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      alias: '/',
      name: 'login',
      component: UserLogin,
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
  ],
})

router.beforeEach(async (to) => {
  if (!userService.isAuthenticated() && to.name !== 'login' && to.name !== 'register') {
    // redirect user to the login page
    return { name: 'login' }
  }
})

export default router
