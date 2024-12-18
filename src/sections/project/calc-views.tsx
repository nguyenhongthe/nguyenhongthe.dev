// app/sections/project/calc-views.tsx

'use client'

import { useDebounce } from 'react-use'
import { getProjectView } from '../../apis/project_api'

const CalcViews = ({ code }: { code: string }) => {
  useDebounce(
    () => {
      getProjectView(code)
        .then((_r) => {
          console.log(`+1 view: ${code}`)
        })
        .catch((error) => {
          console.error('Lỗi khi cập nhật view:', error)
        })
    },
    5000,
    [code]  // Thêm code vào dependency để theo dõi thay đổi
  )

  return null
}

export default CalcViews

