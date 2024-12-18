'use client'

import Link from 'next/link'
import React from 'react'
import Particles from '../../components/particles'
import { getInfoCommon } from '../../apis/info_api'
import { InfoProps } from '@/src/types/info'
import HTMLReactParser from 'html-react-parser'
import { MenuProps } from '@/src/types/listing'
import { getMenuList } from '../../apis/menu_api'

export default function HomeContent() {
  const [navigation, setNavigation] = React.useState<MenuProps[]>([])
  const [infoCommon, setInfoCommon] = React.useState<InfoProps[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const navigationData = await getMenuList()
        const infoCommonData = await getInfoCommon()
        setNavigation(navigationData)
        setInfoCommon(infoCommonData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setNavigation([])
        setInfoCommon([])
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
      <nav role="navigation" className='my-16 animate-fade-in'>
        <ul className='flex items-center justify-center gap-4'>
          {navigation.length > 0
            ? navigation.map((item) =>
              item.url ? (
                <Link
                  key={item.order}
                  href={item.url}
                  title={item.name}
                  className='text-sm duration-500 text-zinc-500 hover:text-zinc-300'
                >
                  {item.name}
                </Link>
              ) : (
                <li key={item.order} className='text-sm text-zinc-500'>
                  {item.name}
                </li>
              )
            )
            : (
              <li className='text-sm text-zinc-500'>
                Chưa có liên kết điều hướng
              </li>
            )}
        </ul>
      </nav>
      <div className='hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0' />
      <Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={100} />
      <h1 className='z-10 text-2xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-6xl whitespace-nowrap bg-clip-text'>
        {infoCommon.length > 0 ? infoCommon[0].name || 'Nguyen Hong The Dev' : 'Nguyen Hong The Dev'}
      </h1>
      <div className='hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0' />
      <div className='my-16 text-center animate-fade-in'>
        <h2 className='text-sm text-zinc-500'>
          {infoCommon.length > 0 ? HTMLReactParser(infoCommon[0].introSafe || 'Đang cập nhật...') : 'Đang cập nhật...'}
        </h2>
      </div>
    </div>
  )
}
