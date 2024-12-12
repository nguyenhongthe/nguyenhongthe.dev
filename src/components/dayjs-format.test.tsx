// components/dayjs-format.test.tsx

import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import DayjsFormat from './dayjs-format'

describe('DayjsFormat Component', () => {
  test('Kiểm tra xem component render đúng định dạng ngày với template hợp lệ', () => {
    render(<DayjsFormat time_='2023-10-27T10:00:00.000Z' template='DD/MM/YYYY' />)
    const formattedDate = screen.getByText('27/10/2023')
    expect(formattedDate).toBeInTheDocument() // Kiểm tra nội dung được render
  })

  test('Kiểm tra xem component sử dụng template mặc định khi không cung cấp template', () => {
    render(<DayjsFormat time_='2023-10-27T10:00:00.000Z' />)
    const defaultFormattedDate = screen.getByText('27/10/2023 10:00') // Template mặc định là 'DD/MM/YYYY HH:mm'
    expect(defaultFormattedDate).toBeInTheDocument()
  })

  test('Kiểm tra xử lý khi input time_ không hợp lệ', () => {
    render(<DayjsFormat time_='Invalid Date' />)
    const invalidDateText = screen.getByText('Invalid Date')
    expect(invalidDateText).toBeInTheDocument()
  })

  test('Kiểm tra khi template không hợp lệ', () => {
    render(<DayjsFormat time_='2023-10-27T10:00:00.000Z' template='invalid_format' />)
    // Day.js không báo lỗi định dạng không hợp lệ, nên nó sẽ trả về nguyên chuỗi đã cung cấp.
    const fallbackText = screen.getByText('Invalid Date')
    expect(fallbackText).toBeInTheDocument()
  })
})
