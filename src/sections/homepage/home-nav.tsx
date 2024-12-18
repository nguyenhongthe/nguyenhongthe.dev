import Link from 'next/link'
import React from 'react'
import type { MenuProps } from '@/src/types/listing'
import { getMenuList } from '../../apis/menu_api'

const HomeNav: () => Promise<React.JSX.Element> = async () => {
  const navigation: MenuProps[] = await getMenuList()
  return (
    <nav className='my-16 animate-fade-in'>
      <ul className='flex items-center justify-center gap-4'>
        {navigation.map((item) => (
          <Link
            key={item.order}
            href={item.url}
            title={item.name}
            className='text-sm duration-500 text-zinc-500 hover:text-zinc-300'
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default HomeNav
