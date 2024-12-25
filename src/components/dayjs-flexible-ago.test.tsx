// src/components/dayjs-flexible-ago.test.tsx

import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DayjsFlexibleAgo from './dayjs-flexible-ago'
import dayjs from 'dayjs'

// Mô phỏng thời gian hiện tại để đảm bảo kết quả nhất quán
vi.useFakeTimers().setSystemTime(new Date('2024-12-01T10:00:00.000Z'))

describe('DayjsFlexibleAgo Component', () => {
  test('hiển thị thời gian trong vòng 5 phút kể từ bây giờ', () => {
    const recentDate = dayjs().subtract(5, 'minute').toISOString() // 5 phút trước
    render(<DayjsFlexibleAgo dateStr={recentDate} />)

    expect(screen.getByText('5 phút trước')).toBeInTheDocument()
  })
  test('hiển thị thời gian trong vòng 1 giờ kể từ bây giờ', () => {
    const recentDate = dayjs().subtract(1, 'hour').toISOString() // 1 giờ trước
    render(<DayjsFlexibleAgo dateStr={recentDate} />)

    expect(screen.getByText('một giờ trước')).toBeInTheDocument()
  })
  test('hiển thị thời gian trong vòng 10 ngày kể từ bây giờ', () => {
    const recentDate = dayjs().subtract(9, 'day').toISOString() // 9 ngày trước
    render(<DayjsFlexibleAgo dateStr={recentDate} />)

    expect(screen.getByText('9 ngày trước')).toBeInTheDocument()
  })

  test('hiển thị thời gian nếu lớn hơn 10 ngày', () => {
    const olderDate = dayjs().subtract(15, 'day').toISOString() // 15 ngày trước
    render(<DayjsFlexibleAgo dateStr={olderDate} />)

    expect(screen.getByText('16/11/2024 17:00')).toBeInTheDocument() // Định dạng ngày cụ thể
  })

  test('hiển thị "Invalid Date" nếu không nhận được thời gian hợp lệ', () => {
    render(<DayjsFlexibleAgo dateStr='invalid date' />)

    expect(screen.getByText('Invalid Date')).toBeInTheDocument()
  })
})