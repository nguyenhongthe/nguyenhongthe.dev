'use server'

import {axiosInstance, baseAPIURL} from '@/apis/axios_configs'

// Lấy danh sách project từ API
export async function getProjectsListing () {
  const res = await fetch(baseAPIURL + '/api/nhtdev/project-listing/', { next: { revalidate: 3 } })
  return await res.json()
}

// Lấy danh sách project featured từ API
export async function getProjectsFeatured () {
  const res = await fetch(baseAPIURL + '/api/nhtdev/project-featured/', { next: { revalidate: 3 } })
  return await res.json()
}

// Lấy thông tin chi tiết Project từ API
export async function getProjectDetail (slug: string) {
  try {
    const res = await fetch(baseAPIURL + `/api/nhtdev/project-detail/?slug=${slug}`, { next: { revalidate: 3 } })
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error fetching project detail:', error);
    throw error;
  }
}

// API tính view cho project
export const getProjectView = async (code: string): Promise<any> => {
  const response = axiosInstance.put('/api/nhtdev/project-calc-views/', {
    code
  })
    return await response
}
