// 'use server'

import { baseAPIURL } from '@/apis/axios_configs'

// Lấy thông tin chung của trang web từ API
export async function getInfoCommon () {
  const res = await fetch(baseAPIURL + '/api/nhtdev/info-common/', { next: { revalidate: 3 } })
  return await res.json()
}
