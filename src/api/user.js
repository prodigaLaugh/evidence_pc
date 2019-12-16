import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/info/query',
    method: 'post',
    data
  })
}


export function  getAvatar( data){
  return request({
    url: '/user/profile/get',
    method: 'post',
    data,
    responseType: 'blob'
  })
}


export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
