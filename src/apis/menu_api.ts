'use server'

import { baseAPIURL } from './axios_configs'
import type { MenuProps } from '@/src/types/listing'

// Lấy danh sách menu từ API
export async function getMenuList(): Promise<MenuProps[]> {
  const res = await fetch(`${baseAPIURL}/api/nhtdev/menu-listing/`, {
    next: { revalidate: 60 }
  })
  return await res.json()
}
