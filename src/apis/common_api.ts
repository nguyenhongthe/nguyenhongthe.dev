// src/apis/common_api.ts

import { baseAPIURL } from './axios_configs'
import { InfoProps, MenuProps, SocialProps } from '@/src/types/common'

// Lấy thông tin chung của trang web từ API
export async function getInfoCommon(): Promise<InfoProps[]> {
  const res = await fetch(`${baseAPIURL}/api/nhtdev/info-common/`, {
    next: { revalidate: 60 }
  })
  return await res.json()
}

// Lấy danh sách menu từ API
export async function getMenuList(): Promise<MenuProps[]> {
  const res = await fetch(`${baseAPIURL}/api/nhtdev/menu-listing/`, {
    next: { revalidate: 60 }
  })
  return await res.json()
}

// Lấy danh sách social từ API
export async function getSocialList(): Promise<SocialProps[]> {
  const res = await fetch(`${baseAPIURL}/api/nhtdev/social-network-listing/`, {
    next: { revalidate: 60 }
  })
  return await res.json()
}
