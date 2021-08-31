import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import IndexWelcome from '@/views/msgManager/indexWelcome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/msgManager/home'),
    children: [
      {
        path: '',
        name: 'Index',
        component: IndexWelcome,
        meta: ['']
      },
      {
        path: '/userManager',
        name: 'UserManager',
        component: () => import('@/views/msgManager/userManager'),
        meta: ['用户管理']
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
