import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import type { MenuProps } from '@/src/types/listing'
import { getMenuList } from '../apis/menu_api'

export const Navigation = async() => {
  const navigation: MenuProps[] = await getMenuList()
  return (
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
  )
}
