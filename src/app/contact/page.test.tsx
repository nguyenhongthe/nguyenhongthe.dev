// src/app/contact/page.test.tsx

import { render, screen, waitFor } from '@testing-library/react'
import { describe, test, vi, expect } from 'vitest'
import Page from './page'

// Mock getMenuList để tránh thực hiện gọi API thực tế
vi.mock('../../apis/menu_api', () => ({
  getMenuList: vi.fn().mockResolvedValue([
    { order: 1, url: '/home', name: 'Home' },
    { order: 2, url: '/about', name: 'About' },
    { order: 3, url: '/contact', name: 'Contact' }
  ])
}))

describe('Contact page testing.', () => {
  test('kiểm tra social links có render chính xác không', async () => {
    render(<Page />)

    // Đợi cho tới khi component đã render xong
    await waitFor(() => {
      // Kiểm tra xem các link trong navigation có render ra không
      // @ts-ignore
      expect(screen.getByText('Home')).toBeInTheDocument()
      // @ts-ignore
      expect(screen.getByText('About')).toBeInTheDocument()
      // @ts-ignore
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    // Kiểm tra xem các social links có render ra đúng không
    // @ts-ignore
    expect(screen.getByText('@realTheNguyen')).toBeInTheDocument()
    // @ts-ignore
    expect(screen.getByText('dev@nguyenhongthe.net')).toBeInTheDocument()
    // @ts-ignore
    expect(screen.getByText('nguyenhongthe')).toBeInTheDocument()
  })
})