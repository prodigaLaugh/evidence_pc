import request from '@/utils/request'

export function queryEvidenceList(data) {
  return request({
    url: '/evidence/list/query',
    method: 'post',
    data
  })
}

export function queryEvidenceDetail(data) {
  return request({
    url: '/evidence/detail/query',
    method: 'post',
    data
  })
}


export function uploadEvidence(data) {
  return request({
    url: '/evidence/upload',
    method: 'post',
    data
  })
}


