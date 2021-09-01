/**
 * api接口统一管理
 * p为请求携带的参数
 **/
import { get, post } from './http'

//登录
export const apiLogin = p => post('/sys/login', p)

//退出
export const apiLogout = p => get('/sys/logout', p)

//获取用户列表
export const apiGetUserList = p => get('/main/system/user/show', p)

//增加用户
export const apiAddUser = p => post('/main/system/user/add', p)

//修改用户
export const apiUpdateUser = p => post('/main/system/user/update', p)

//删除用户
export const apiDeleteUser = p => post('/main/system/user/delete', p)

//获取产品分类
export const apiGetSaleCategory = p => get('/main/sell/category/show', p)

//获取所有产品分类列表
export const apiGetAllSaleCategory = p => get('/main/sell/category/all', p)

//修改产品分类
export const apiUpdateSaleCategory = p => post('/main/sell/category/update', p)

//删除产品分类
export const apiDelSaleCategory = p => post('/main/sell/category/delete', p)

//添加产品分类
export const apiAddSaleCategory = p => post('/main/sell/category/add', p)

//获取产品
export const apiGetProduct = p => get('/main/sell/product/show', p)

//获取所有产品列表
export const apiGetAllProduct = p => get('/main/sell/product/all', p)

// 添加产品
export const apiAddProduct = p => post('/main/sell/product/add', p)

//修改产品
export const apiUpdateProduct = p => post('/main/sell/product/update', p)

//删除产品
export const apiDelProduct = p => post('/main/sell/product/delete', p)

//获取供应商
export const apiGetSupplier = p => get('/main/purchase/vender/show', p)
