import request from '@/utils/request'

export function queryUsageStatistics(data) {
  return request({
    url: '/evidence/usage/statistics',
    method: 'post',
    data
  })
}


