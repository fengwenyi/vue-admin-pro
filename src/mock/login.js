import { getParams } from '@/libs/util'
import { Message } from 'view-design'

const USER_MAP = {
  jsdz: {
    name: 'super_admin',
    user_id: '1',
    access: ['super_admin', 'admin'],
    token: 'jsdz',
    avatar: 'http://localhost:8108/header.jpg'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  console.log(JSON.stringify(req))
  let password = req.password
  if (password === 'jsdz1234') {
    return { token: USER_MAP[req.userName].token }
  } else {
    Message.error('登录失败，原因：密码不正确')
  }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
