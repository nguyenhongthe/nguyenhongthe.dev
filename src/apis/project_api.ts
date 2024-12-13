import { baseAPIURL } from './axios_configs'

/**
 * Lấy danh sách project từ API
 */
export async function getProjectsListing() {
  try {
    const res = await fetch(`${baseAPIURL}/api/nhtdev/project-listing/`, {
      next: { revalidate: 60 },
      headers: {
        Accept: 'application/json'
      }
    })
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error fetching projects listing:', error)
    return []
  }
}

/**
 * Lấy danh sách project featured từ API
 */
export async function getProjectsFeatured() {
  try {
    const res = await fetch(`${baseAPIURL}/api/nhtdev/project-featured/`, {
      next: { revalidate: 60 },
      headers: {
        Accept: 'application/json'
      }
    })
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

/**
 * Lấy thông tin chi tiết Project từ API
 */
export async function getProjectDetail(slug) {
  try {
    const res = await fetch(
      `${baseAPIURL}/api/nhtdev/project-detail/?slug=${slug}`,
      {
        next: { revalidate: 60 },
        headers: {
          Accept: 'application/json'
        }
      }
    )
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Error fetching project detail:', error)
    throw error
  }
}

/**
 * API tính view cho project
 */
export async function getProjectView(code) {
  try {
    const response = await fetch(`${baseAPIURL}/api/nhtdev/project-calc-views/`, {
      method: 'PUT',
      body: JSON.stringify({ code }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error calculating project views:', error)
    return { success: false, error: 'Failed to calculate views' }
  }
}
