// app/contact/page.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { ArrowLeft, Github, Mail, X } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '@/src/components/nav'
import { Card } from '@/src/components/card'
import type { MenuProps } from '@/src/types/listing'
import { getMenuList } from '../../apis/menu_api'

const socials = [
  {
    icon: <X size={20} />,
    href: 'https://x.com/realTheNguyen',
    label: 'X (Twitter)',
    handle: '@realTheNguyen'
  },
  {
    icon: <Mail size={20} />,
    href: 'mailto:dev@nguyenhongthe.net',
    label: 'Email',
    handle: 'dev@nguyenhongthe.net'
  },
  {
    icon: <Github size={20} />,
    href: 'https://github.com/nguyenhongthe',
    label: 'Github',
    handle: 'nguyenhongthe'
  }
]

const Contacts: React.FC = () => {
  const [navigation, setNavigation] = useState<MenuProps[]>([])

  useEffect(() => {
    const fetchNavigation = async() => {
      const navList = await getMenuList()
      setNavigation(navList)
    }

    fetchNavigation()
  }, [])

  return (
    <div className='bg-gradient-to-tl from-zinc-900/113 via-zinc-900 to-zinc-900/0'>
      <header>
        <div className='container flex flex-row-reverse items-center justify-between p-6 mx-auto'>
          <div className='flex justify-between gap-8'>
            {navigation.map((item) => (
              <Link
                key={item.order}
                href={`${item.url}`}
                title={item.name}
                className='text-sm duration-500 text-zinc-500 hover:text-zinc-300'
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            href='/'
            className='duration-200 text-zinc-300 hover:text-zinc-100'
          >
            <ArrowLeft className='w-6 h-6 ' />
          </Link>
        </div>
      </header>
      <div className='container flex items-center justify-center min-h-screen px-4 mx-auto'>
        <div className='grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16'>
          {socials.map((s, index) => (
            <Card key={index}>
              <Link
                href={s.href}
                target='_blank'
                className='p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16'
                rel='noreferrer'
              >
                <span
                  className='absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent'
                  aria-hidden='true'
                />
                <span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange'>
                  {s.icon}
                </span>
                <div className='z-10 flex flex-col items-center'>
                  <span className='lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display'>
                    {s.handle}
                  </span>
                  <span className='mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200'>
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contacts
