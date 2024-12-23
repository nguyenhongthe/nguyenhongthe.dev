// src/components/Navigation.tsx

import Link from 'next/link'
import { MenuProps } from '@/src/types/common'
import { Home } from 'lucide-react'
import React from 'react'
import { siteUrlPrefix } from '../../constrains'

interface NavigationProps {
  navigation: MenuProps[];
}

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <div className='container flex flex-row-reverse items-center justify-between p-6 mx-auto'>
      <div className='flex justify-between gap-8'>
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
      </div>

      <Link
        href={siteUrlPrefix}
        className='duration-200 text-zinc-300 hover:text-zinc-100'
      >
        <Home className='w-6 h-6' />
      </Link>
    </div>
  )
}

export default Navigation
