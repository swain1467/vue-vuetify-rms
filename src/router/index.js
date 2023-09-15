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
  // Routes For User Pages,
  {
    path: '/UserDashboard',
    name: 'user_dashboard',
    component: () => import('../views/user/DashboardView.vue')
  },
  {
    path: '/Find',
    name: 'find',
    component: () => import('../views/user/FindView.vue')
  },
  {
    path: '/Post',
    name: 'post',
    component: () => import('../views/user/PostView.vue')
  },
  {
    path: '/PostHistory',
    name: 'post_history',
    component: () => import('../views/user/PostHistoryView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
