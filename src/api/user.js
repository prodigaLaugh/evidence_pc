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

export function  modifyAvatar( data){
  return request({
    url: '/user/profile/set',
    method: 'post',
    data,
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

export function  sendVerificationCode( data){
  return request({
    url: '/email/verify/code/send',
    method: 'post',
    data,
  })
}

export function  checkVerificationCode( data){
  return request({
    url: '/verify/code/check',
    method: 'post',
    data,
  })
}

export function  register( data){
  return request({
    url: '/user/regist',
    method: 'post',
    data,
  })
}

export function  retrive( data){
  return request({
    url: '/user/password/retrive',
    method: 'post',
    data,
  })
}

export function  queryVerifyStatus( data){
  return request({
    url: '/user/realname/verify/status/query',
    method: 'post',
    data,
  })
}

export function  modifyUsername( data){
  return request({
    url: '/user/name/update',
    method: 'post',
    data,
  })
}

export function  bindPhone( data){
  return request({
    url: '/user/phone/bind',
    method: 'post',
    data,
  })
}

export function  queryEnterpriseCertification( data){
  return request({
    url: '/user/company/verify/info/query',
    method: 'post',
    data,
  })
}

export function  queryPersonalAuthentication( data){
  return request({
    url: '/user/person/verify/info/query',
    method: 'post',
    data,
  })
}

export function  personalAuthentication( data){
  return request({
    url: '/user/realname/person/verify',
    method: 'post',
    data,
  })
}

export function  enterpriseCertification( data){
  return request({
    url: '/user/realname/company/verify',
    method: 'post',
    data,
  })
}


export function downloadPrivatekey(data) {
  return request({
    url: '/evidence/keys/file/download',
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
