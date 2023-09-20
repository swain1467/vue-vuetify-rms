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
  },
  {
    path: '/AdminDashboard',
    name: 'admin_dashboard',
    component: () => import('../views/admin/AdminDashboardView.vue')
  },
  {
    path: '/ActiveUsers',
    name: 'active_users',
    component: () => import('../views/admin/ActiveUsersView.vue')
  },
  {
    path: '/BlackListedUsers',
    name: 'black_listed_users',
    component: () => import('../views/admin/BlackListedUsersView.vue')
  },
  {
    path: '/Setup',
    name: 'setup',
    component: () => import('../views/admin/SetupView.vue')
  },
  {
    path: '/Transition',
    name: 'transition',
    component: () => import('../views/admin/TransitionView.vue')
  },
  //catch all 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
