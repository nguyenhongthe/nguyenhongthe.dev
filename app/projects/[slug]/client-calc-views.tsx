'use client'  // Khai báo đây là Client Component

import dynamic from 'next/dynamic'

// Import động `CalcViews`
const CalcViews = dynamic(() => import('./view'), { ssr: false })

// Component trung gian
const CalcViewsWrapper = ({ code }: { code: string }) => {
  return <CalcViews code={code} />
}

export default CalcViewsWrapper
