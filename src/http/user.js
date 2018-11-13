import * as http from './base'
/**
* 登陆
* @param {object} data
*/
const login = (data) => {
  return http.post('/users/login', data)
}
/**
* 获取用户列表
* @param {object} params
*/
const getUserList = (params) => {
  return http.fetch('/users', params)
}
export { login, getUserList }
