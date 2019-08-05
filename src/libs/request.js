import axios from 'axios'
import config from '@/config'
import { Message } from 'iview'
import { setToken, getToken } from '@/libs/util'
import Router from '@/router/index'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  requestConfig => {
    // do something before request is sent
    if (config.api.header.token && getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      requestConfig.headers[config.api.header.tokenKey] = getToken()
    }
    if (config.api.header.json) {
      requestConfig.headers['Content-Type'] = 'application/json; charset=UTF-8'
    }
    return requestConfig
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // console.log(res)
    if (res.code === 0) {
      return res.data
    } else {
      Message.error(res.msg)
      setToken('')
      Router.push({
        name: 'login'
      })
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
