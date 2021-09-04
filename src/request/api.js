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

//修改供应商
export const apiUpdateSupplier = p => post('/main/purchase/vender/update', p)

//添加供应商
export const apiAddSupplier = p => post('/main/purchase/vender/add', p)

//删除供应商
export const apiDelSupplier = p => post('/main/purchase/vender/delete', p)

//获取根据条件查询的采购单
export const apiBuylistQuery = p => get('/main/purchase/pomain/query', p)

//获取所有供应商列表
export const apiGetVenderAll = p => get('/main/purchase/vender/all', p)

//获取指定采购单的明细
export const apiGetPomainQueryItem = p => get('/main/purchase/pomain/queryItem', p)

//修改新增状态的采购单
export const apiPomainUpdate = p => post('/main/purchase/pomain/update', p)

//删除新增状态的采购单
export const apiDelPomain = p => post('/main/purchase/pomain/delete', p)

//采购单了结
export const apiPomainEnd = p => post('/main/purchase/pomain/end', p)

//获取指定类型的采购单
export const apiPomainShow = p => get('/main/purchase/pomain/show', p)

//入库
export const apiInstock = p => post('/main/stock/instock', p)

//出库
export const apiOutstock = p => post('/main/stock/outstock', p)

//获取指定类型的销售单
export const apiGetSomainShow = p => get('/main/sell/somain/show', p)

//获取指定销售单的明细
export const apiGetSomainQueryItem = p => get('/main/sell/somain/queryItem', p)

//库存查询
export const apiGetStock = p => get('/main/stock/query', p)

//库存盘点
export const apiCheckStock = p => get('/main/stock/checkstock', p)

//获取客户信息
export const apiGetCustomer = p => get('/main/sell/customer/show', p)

//添加客户
export const apiCustomerAdd = p => post('/main/sell/customer/add', p)

//修改客户
export const apiCustomerUpdate = p => post('/main/sell/customer/update', p)

//删除客户
export const apiCustomerDel = p => post('/main/sell/customer/delete', p)

//获取根据条件查询的销售单
export const apiGetSomainQuery = p => get('/main/sell/somain/query', p)

//修改新增状态的销售单
export const apiSomainUpdate = p => post('/main/sell/somain/update', p)

//销售单了结
export const apiSomainEnd = p => post('/main/sell/somain/end', p)
