'use client'

import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime)

const DayjsFlexibleAgo = ({ dateStr }: { dateStr: string }) => {
  // nếu thời gian trong vòng 10 ngày thì hiển thị bằng lệnh `fromNow`
  // còn nếu lớn hơn 10 ngày thì hiển thị theo định dạng `DD/MM/YYYY HH:mm`
  const t = dayjs(dateStr)
  if (t.isAfter(dayjs().subtract(10, 'day'))) {
    return (
      <span>
        {t.locale('vi').fromNow()}
      </span>
    )
  } else {
    return (
      <span>
        {t.locale('vi').format('DD/MM/YYYY HH:mm')}
      </span>
    )
  }
}

export default DayjsFlexibleAgo
