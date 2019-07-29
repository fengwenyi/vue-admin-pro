import request from '@/libs/request'

export function apiDataTest (data) {
  const param = JSON.stringify(data)
  return request({
    url: '/data/test',
    method: 'post',
    data: param
  })
}
