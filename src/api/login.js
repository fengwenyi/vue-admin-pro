// import axios from '@/libs/api.request'
import request from '@/libs/request'

/**
 * 登录
 * @param account
 * @param password
 * @returns {http.ClientRequest | ClientHttp2Stream | * | never | AxiosPromise<any>}
 */
// export const login = (account, password) => {
//   const data = {
//     account,
//     password
//   }
//   return axios.request({
//     url: 'auth/login',
//     method: 'post',
//     dataType: 'json',
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8'
//     },
//     data: data
//   })
// }
export const login = (account, password) => {
  const data = {
    account,
    password
  }
  return request({
    url: 'auth/login',
    method: 'post',
    data: data
  })
}

/**
 * 退出登录
 * @param token
 */
export const logout = (token) => {
  const data = {}
  return request({
    url: 'auth/logout',
    method: 'get',
    data: data
  })
}
