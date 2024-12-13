// app/page.tesst.tsx

import { render, screen, within, waitFor, cleanup } from '@testing-library/react'
import { describe, test, vi, expect, beforeEach, afterEach } from 'vitest'
import Home from './page'
import { getMenuList } from '../apis/menu_api'
import { getInfoCommon } from '../apis/info_api'

// Giả lập menu_api để tránh thực hiện gọi API thực tế
vi.mock('../apis/menu_api', () => ({
  getMenuList: vi.fn()
}))

// Giả lập info_api để tránh thực hiện gọi API thực tế
vi.mock('../apis/info_api', () => ({
  getInfoCommon: vi.fn()
}))

describe('Trang Home', () => {
  beforeEach(() => {
    // Reset mock trước mỗi test case
    vi.mocked(getMenuList).mockReset()
    vi.mocked(getInfoCommon).mockReset()

    // Thiết lập giá trị mặc định cho mock
    vi.mocked(getMenuList).mockResolvedValue([
      { name: 'Projects', url: '/projects', order: '1' },
      { name: 'Blog', url: 'https://nguyenhongthe.net', order: '2' },
      { name: 'Contact', url: '/contact', order: '3' }
    ])

    vi.mocked(getInfoCommon).mockResolvedValue([
      { name: 'Nguyen Hong The Dev', introSafe: 'Xin chào!', metaTitle: 'Trang Chủ', metaDescription: 'Mô tả trang chủ' }
    ])
  })

  afterEach(() => {
    cleanup()
  })

  test('Hiển thị các liên kết điều hướng', async () => {
    render(await Home())

    // Đợi cho tới khi component đã render xong
    await waitFor(() => {
      // Kiểm tra xem liên kết điều hướng có hiển thị đúng không
      expect(screen.getByText('Projects')).toBeInTheDocument()
      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })
    // Kiểm tra xem các liên kết điều hướng có hiển thị đúng không
    const navList = screen.getByRole('navigation')
    const { getAllByRole } = within(navList)
    const links = getAllByRole('link')
    expect(links).toHaveLength(3)
  })

  test('Hiển thị thông báo khi không có dữ liệu điều hướng', async () => {
    vi.mocked(getMenuList).mockResolvedValueOnce([])

    render(await Home())

    await waitFor(() => {
      expect(screen.getByText('No navigation items available')).toBeInTheDocument()
    })
  })

  test('Hiển thị thông tin chung đúng cách', async () => {
    render(await Home())

    // Kiểm tra tiêu đề và mô tả trang
    await waitFor(() => {
      expect(screen.getAllByText('Nguyen Hong The Dev')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Xin chào!')[0]).toBeInTheDocument()
    })
  })

  test('Hiển thị thông tin mặc định khi không có dữ liệu thông tin chung', async () => {
    vi.mocked(getInfoCommon).mockResolvedValueOnce([])

    render(await Home())

    await waitFor(() => {
      expect(screen.getAllByText('Nguyen Hong The Dev')[0]).toBeInTheDocument()
      expect(screen.getByText('Đang cập nhật...')).toBeInTheDocument()
    })
  })
})
