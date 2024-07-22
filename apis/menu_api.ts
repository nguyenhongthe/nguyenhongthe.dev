'use server'

import { baseAPIURL } from '@/apis/axios_configs'

// Lấy danh sách menu từ API
export async function getMenuList () {
  const res = await fetch(baseAPIURL + '/api/nhtdev/menu-listing/', { next: { revalidate: 60 } })
  return await res.json()
}
