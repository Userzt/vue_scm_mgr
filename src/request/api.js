/**   
 * api接口统一管理
 */
 import { get, post } from './http'

 //登录   p为请求携带的参数
 export const apiLogin = p => post('/sys/login', p);

 //退出
 export const apiLogout = p => get('/sys/logout', p);

 //获取用户列表
 export const apiGetUserList = p =>get('/main/system/user/show',p);

 //增加用户
 export const apiAddUser = p =>post('/main/system/user/add',p);

 //修改用户
 export const apiUpdateUser = p =>post('/main/system/user/update',p);

 //删除用户
 export const apiDeleteUser = p =>post('/main/system/user/delete',p);

//获取产品分类
export const apiGetSellCategory = p =>get('/main/sell/category/show',p);




 

 