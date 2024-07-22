'use client'

import { useDebounce } from 'react-use'
import { getProjectView } from '@/apis/project_api'

const CalcViews = ({ code }: { code: string }) => {
	useDebounce(
		() => {
			getProjectView(code).then(r => {
				console.log(`+1 view: ${code}`)
			}).catch(() => {})
		},
		5000,
		[]
	)
	return null
}

export default CalcViews
