import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 获取数据
 * @param d1 参数1
 * @param d2 参数2
 */
export const data = (d1, d2) => {
  const data = {
    d1,
    d2
  }
  return axios.request({
    url: 'auth/login',
    method: 'post',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'token': getToken()
    },
    data: data
  })
}

/**
 * 获取数据
 * @param param 参数
 */
export const data2 = (param) => {
  return axios.request({
    url: 'auth/login',
    method: 'post',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'token': getToken()
    },
    data: param
  })
}
