// src/components/card.test.tsx

import { describe, expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Card } from './card'

describe('Card Component', () => {

  test('Kiểm tra xem component có render ra không.', () => {
    render(<Card><h1>Test Title</h1></Card>)
    const titleElement = screen.getByText(/Test Title/i)
    expect(titleElement).toBeInTheDocument()
  })

  test('Kiểm tra xem component có thêm class overflow-hidden không', () => {
    const { container } = render(<Card><h1>Test Title</h1></Card>)
    const cardElement = container.firstChild

    // Kiểm tra trạng thái ban đầu
    expect(cardElement).toHaveClass('overflow-hidden')

    // Mô phỏng sự kiện di chuyển chuột
    fireEvent.mouseMove(cardElement!, { clientX: 100, clientY: 100 })
  })
})