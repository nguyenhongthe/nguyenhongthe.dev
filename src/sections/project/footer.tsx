// src/sections/project/footer.tsx

import React from 'react'
import Link from 'next/link'
import { siteName, siteUrlPrefix } from '../../../constrains'
import { getSocialList } from '../../apis/common_api'
import type { SocialProps } from '@/src/types/common'
import Image from 'next/image'

// @ts-ignore
export const Footer: React.FC = async () => {
  const links: { label: string; href: string }[] = []
  const linkData = [
    { label: 'Terms of Service', href: siteUrlPrefix + '/tos/' },
    { label: 'Privacy Policy', href: siteUrlPrefix + '/privacy/' },
  ]

  linkData.forEach(link => links.push(link))

  let socialList: SocialProps[]

  try {
    socialList = await getSocialList()
  } catch (error) {
    console.error('Error fetching menu list:', error)
    socialList = []
  }


  return (
    <footer className='grid grid-cols-1 gap-4 mx-auto md:pt-16 lg:mx-0 lg:pt-8'>
      <div className='hidden w-full h-px md:block bg-zinc-800 sm:block sm:mt-8'/>
      <div className='container mx-auto py-12 px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Phần trái - Project Links */}
          <div>
            <h3 className='text-xl font-bold text-zinc-400 mb-4'>
              {siteName}
            </h3>
            <div className='flex gap-4'>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className='text-zinc-400 hover:text-zinc-100 duration-200'
                  rel='noreferrer'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Phần phải - Social Links & Copyright */}
          <div className='flex flex-col items-start md:items-end'>
            <div className='flex gap-6 mb-6'>
              {socialList.map((social) => (
                <Link
                  target='_blank'
                  key={social.name}
                  href={social.url}
                  className='text-zinc-400 hover:text-zinc-100 duration-200'
                  rel='noreferrer'
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    title={social.name}
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>
            <div className='text-zinc-400 text-sm'>
              &copy; {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
