// app/contact/page.tsx

import React from 'react'
import { Github, Mail, X } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/src/components/card'
import type { MenuProps } from '@/src/types/common'
import { getMenuList } from '../../apis/common_api'
import { Footer } from '@/src/sections/project/footer'
import type { Metadata } from 'next'
import { defaultOgImage, siteDescription, siteName, siteUrlPrefix } from '../../../constrains'
import Navigation from '@/src/components/Navigation'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Contact' + ' - ' + siteName
  const desc = siteDescription

  return {
    metadataBase: new URL(siteUrlPrefix),
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      url: siteUrlPrefix + '/contact/',
      type: 'website',
      images: [defaultOgImage]
    },
    alternates: {
      canonical: siteUrlPrefix + '/contact/',
    },
    twitter: {
      site: '@realTheNguyen',
      title: title,
      description: desc,
      card: 'summary_large_image',
      images: [defaultOgImage]
    },
  }
}


const contactInfo = [
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

export default async function Page() {
  let navigation: MenuProps[]

  try {
    navigation = await getMenuList()
  } catch (error) {
    console.error('Error fetching menu list:', error)
    navigation = []
  }

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900'>
      {/* Header */}
      <header>
        <Navigation navigation={navigation} />
      </header>

      {/* Main Content - flex-grow để chiếm không gian còn lại */}
      <main className='flex-grow container flex flex-col items-center justify-center px-4 mx-auto text-center'>
        {/* Title */}
        <h1 className='text-4xl font-bold text-white sm:text-2xl lg:text-4xl mb-8'>
          I'm always available to chat!
        </h1>

        {/* Description */}
        <p className='text-lg text-zinc-400 sm:text-xl lg:text-2xl mb-14'>
          Please connect with me through the channels below.
          <br/>
          I'm happy to provide any additional information you need!
        </p>

        {/* Contact Cards */}
        <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-16'>
          {contactInfo.map((s, index) => (
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
                <span
                  className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange'>
                  {s.icon}
                </span>
                <div className='z-10 flex flex-col items-center'>
                  <span
                    className='lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display'>
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
      </main>


      {/* Footer */}
      <Footer/>
    </div>
  )
}
