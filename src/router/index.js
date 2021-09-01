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
      },
      {
        path: '/userAdd',
        name: 'UserAdd',
        component: () => import('@/views/msgManager/userAdd'),
        meta: ['用户添加']
      }, {
        path: '/saleCategory',
        name: 'SaleCategory',
        component: () => import('@/views/productMgr/productSortMgr'),
        meta: ['产品分类管理']
      }, {
        path: '/addCategory',
        name: 'AddCategory',
        component: () => import('@/views/productMgr/addCategory'),
        meta: ['产品分类添加']
      }, {
        path: '/allproducts',
        name: 'Allproducts',
        component: () => import('@/views/productMgr/productList'),
        meta: ['产品列表']
      }, {
        path: '/addproducts',
        name: 'Addproducts',
        component: () => import('@/views/productMgr/addProduct'),
        meta: ['产品添加']
      }, {
        path: '/supplier',
        name: 'Supplier',
        component: () => import('@/views/purchaseMgr/supplierMgr'),
        meta: ['供应商管理']
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
