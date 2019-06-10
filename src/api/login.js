import axios from '@/libs/api.request'

/**
 * 登录
 * @param account
 * @param password
 * @returns {http.ClientRequest | ClientHttp2Stream | * | never | AxiosPromise<any>}
 */
export const login = (account, password) => {
  const data = {
    account,
    password
  }
  return axios.request({
    url: 'auth/login',
    method: 'post',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    data: data
  })
}

/**
 * 退出登录
 * @param token
 * @returns {http.ClientRequest | ClientHttp2Stream | * | never | AxiosPromise<any>}
 */
export const logout = (token) => {
  const data = {}
  return axios.request({
    url: 'auth/logout',
    method: 'get',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'token': token
    },
    data: data
  })
}
