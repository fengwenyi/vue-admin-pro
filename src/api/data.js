import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

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
