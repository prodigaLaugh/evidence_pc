import request from '@/utils/request'

export function addUsageTime(data) {
  return request({
    url: '/evidence/usage/time/add',
    method: 'post',
    data
  })
}


