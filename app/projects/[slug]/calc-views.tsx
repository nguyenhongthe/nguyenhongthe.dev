'use client'

import dynamic from 'next/dynamic'
import type { FC } from 'react'

interface CalcViewsProps {
  code: string
}

const CalcViews = dynamic(() => import('./view'), { ssr: false })

const CalcViewsWrapper: FC<CalcViewsProps> = ({ code }) => {
  return <CalcViews code={code} />
}

export default CalcViewsWrapper
