import axios from 'axios'
import config from '@/config'
import { Message } from 'view-design'
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
    let httpStatus = response.status
    if (httpStatus === 200) {
      const res = response.data
      if (!res.success) {
        let message = res.message
        Message.error(message)
        if (message.indexOf('身份') > -1 ||
                    message.indexOf('token') > -1) {
          // 退出登录
          setToken('')
          Router.push('/login')
        }
      }
      return res
    } else {
      console.error(response)
    }
  }
)

export default service
