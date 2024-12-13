// components/dayjs-format.tsx

import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DayjsFormat = ({ template = 'DD/MM/YYYY HH:mm', time_ }: { template?: string, time_: string }) => {
    const formattedDate = dayjs.utc(time_).isValid() ? dayjs.utc(time_).format(template) : 'Invalid Date'
  return <>{formattedDate}</>
}

export default DayjsFormat
