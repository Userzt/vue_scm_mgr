import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import IndexWelcome from '@/views/msgManager/indexWelcome'
import Router from 'vue-router'

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
      },
      {
        path: '/saleCategory',
        name: 'SaleCategory',
        component: () => import('@/views/productMgr/productSortMgr'),
        meta: ['产品分类管理']
      },
      {
        path: '/addCategory',
        name: 'AddCategory',
        component: () => import('@/views/productMgr/addCategory'),
        meta: ['产品分类添加']
      },
      {
        path: '/allproducts',
        name: 'Allproducts',
        component: () => import('@/views/productMgr/productList'),
        meta: ['产品列表']
      },
      {
        path: '/addproducts',
        name: 'Addproducts',
        component: () => import('@/views/productMgr/addProduct'),
        meta: ['产品添加']
      },
      {
        path: '/supplier',
        name: 'Supplier',
        component: () => import('@/views/purchaseMgr/SupplierManager/supplierMgr'),
        meta: ['供应商管理']
      },
      {
        path: '/addsupplier',
        name: 'AddSupplier',
        component: () => import('@/views/purchaseMgr/SupplierManager/addSupplier'),
        meta: ['供应商添加']
      },
      {
        path: '/buylist',
        name: 'Buylist',
        component: () => import('@/views/purchaseMgr/BuylistManager/buylistMgr'),
        meta: ['采购单管理']
      },
      {
        path: '/addbuylist',
        name: 'AddBuylist',
        component: () => import('@/views/purchaseMgr/BuylistManager/addBuylist'),
        meta: ['采购单添加']
      },
      {
        path: '/endlist',
        name: 'Endlist',
        component: () => import('@/views/purchaseMgr/endlist'),
        meta: ['采购单了结']
      },
      {
        path: '/listquery',
        name: 'Listquery',
        component: () => import('@/views/purchaseMgr/buylistQuery'),
        meta: ['采购单查询']
      },
      {
        path: '/warehouseRegister',
        name: 'WarehouseRegister',
        component: () => import('@/views/warehouseMgr/register'),
        meta: ['入库登记']
      },
      {
        path: '/warehouseOut',
        name: 'WarehouseOut',
        component: () => import('@/views/warehouseMgr/out'),
        meta: ['出库登记']
      },
      {
        path: '/warehouseQuery',
        name: 'WarehouseQuery',
        component: () => import('@/views/warehouseMgr/query'),
        meta: ['库存查询']
      },
      {
        path: '/warehouseCheck',
        name: 'WarehouseCheck',
        component: () => import('@/views/warehouseMgr/check'),
        meta: ['库存盘点']
      },
      {
        path: '/customer',
        name: 'Customer',
        component: () => import('@/views/saleMgr/customer'),
        meta: ['客户管理']
      },
      {
        path: '/customerAdd',
        name: 'CustomerAdd',
        component: () => import('@/views/saleMgr/customer/customerAdd'),
        meta: ['客户添加']
      },
      {
        path: '/salelist',
        name: 'Salelist',
        component: () => import('@/views/saleMgr/saleList'),
        meta: ['销售单管理']
      },
      {
        path: '/salelistAdd',
        name: 'SalelistAdd',
        component: () => import('@/views/saleMgr/saleList/addSalelist'),
        meta: ['销售单添加']
      },
      {
        path: '/oversale',
        name: 'OverSale',
        component: () => import('@/views/saleMgr/overSale'),
        meta: ['销售单了结']
      },
      {
        path: '/salequery',
        name: 'Salequery',
        component: () => import('@/views/saleMgr/saleQuery'),
        meta: ['销售单查询']
      },
      {
        path: '/incomeCheck',
        name: 'IncomeCheck',
        component: () => import('@/views/payMgr/income'),
        meta: ['收款登记']
      },
      {
        path: '/payCheck',
        name: 'PayCheck',
        component: () => import('@/views/payMgr/pay'),
        meta: ['付款登记']
      },
      {
        path: '/payquery',
        name: 'Payquery',
        component: () => import('@/views/payMgr/payquery'),
        meta: ['收支查询']
      },
      {
        path: '/poreport',
        name: 'Poreport',
        component: () => import('@/views/monthlyReport/poreport'),
        meta: ['月度采购报表']
      },
      {
        path: '/soreport',
        name: 'Soreport',
        component: () => import('@/views/monthlyReport/soreport'),
        meta: ['月度销售报表']
      },
      {
        path: '/outreport',
        name: 'Outreport',
        component: () => import('@/views/monthlyReport/outreport'),
        meta: ['月度出库报表']
      },
      {
        path: '/inreport',
        name: 'Inreport',
        component: () => import('@/views/monthlyReport/inreport'),
        meta: ['月度入库报表']
      },
      {
        path: '/storereport',
        name: 'Storereport',
        component: () => import('@/views/monthlyReport/storereport'),
        meta: ['月度库存报表']
      },
      {
        path: '/payreport',
        name: 'Payreport',
        component: () => import('@/views/monthlyReport/payreport'),
        meta: ['月度收支报表']
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//配置路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//     return
//   }
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     next('/login')
//     return
//   }
//   next()
// })

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

export default router
