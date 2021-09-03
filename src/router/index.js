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
        component: () => import('@/views/purchaseMgr/SupplierManager/supplierMgr'),
        meta: ['供应商管理']
      }, {
        path: '/addsupplier',
        name: 'AddSupplier',
        component: () => import('@/views/purchaseMgr/SupplierManager/addSupplier'),
        meta: ['供应商添加']
      }, {
        path: '/buylist',
        name: 'Buylist',
        component: () => import('@/views/purchaseMgr/BuylistManager/buylistMgr'),
        meta: ['采购单管理']
      }, {
        path: '/addbuylist',
        name: 'AddBuylist',
        component: () => import('@/views/purchaseMgr/BuylistManager/addBuylist'),
        meta: ['采购单添加']
      }, {
        path: '/endlist',
        name: 'Endlist',
        component: () => import('@/views/purchaseMgr/endlist'),
        meta: ['采购单了结']
      }, {
        path: '/listquery',
        name: 'Listquery',
        component: () => import('@/views/purchaseMgr/buylistQuery'),
        meta: ['采购单查询']
      }, {
        path: '/warehouseRegister',
        name: 'WarehouseRegister',
        component: () => import('@/views/warehouseMgr/register'),
        meta: ['入库登记']
      }, {
        path: '/warehouseOut',
        name: 'WarehouseOut',
        component: () => import('@/views/warehouseMgr/out'),
        meta: ['出库登记']
      }, {
        path: '/warehouseQuery',
        name: 'WarehouseQuery',
        component: () => import('@/views/warehouseMgr/query'),
        meta: ['库存查询']
      }, {
        path: '/warehouseCheck',
        name: 'WarehouseCheck',
        component: () => import('@/views/warehouseMgr/check'),
        meta: ['库存盘点']
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
