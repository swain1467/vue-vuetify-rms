import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/SignIn',
    name: 'sign_in',
    component: () => import('../views/SignInView.vue')
  },
  {
    path: '/SignUp',
    name: 'sign_up',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/ChangePassword',
    name: 'change_password',
    component: () => import('../views/ChangePasswordView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
