import React from 'react'
import dayjs from 'dayjs'

const DayjsFormat = ({ template = 'DD/MM/YYYY HH:mm', time_ }: { template?: string, time_: string }) => {
    return (
        <>
            {dayjs(time_).format(template)}
        </>
    )
}

export default DayjsFormat
