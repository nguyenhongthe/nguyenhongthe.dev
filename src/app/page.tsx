// app/page.tsx

import Link from 'next/link'
import React from 'react'
import Particles from 'src/components/particles'
import type { Metadata } from 'next'
import { siteDescription, siteName, siteUrlPrefix } from '../../constrains'
import { getInfoCommon, getMenuList } from '../apis/common_api'
import { type InfoProps, MenuProps } from 'src/types/common'
import HTMLReactParser from 'html-react-parser'

// Component trang chủ

export async function generateMetadata(
): Promise<Metadata> {
  const item: InfoProps[] = await getInfoCommon()
  const title = item[0].metaTitle.length > 0 ? item[0].metaTitle : item[0].name ?? siteName
  return {
    metadataBase: new URL(siteUrlPrefix),
    title,
    description: item[0].metaDescription.length > 0 ? item[0].metaDescription : siteDescription,
    openGraph: {
      ...item[0].openGraph,
      type: 'website',
    },
    alternates: {
      canonical: siteUrlPrefix,
    },
    twitter: {
      title,
      description: item[0].openGraph.description,
      card: 'summary_large_image',
      images: item[0].openGraph.images,
    },
  }
}


export default async function Page() {

  const navigation: MenuProps[] = await getMenuList().catch(() => [])
  const infoSite: InfoProps[] = await getInfoCommon()

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
      <nav className='my-16 animate-fade-in'>
        <ul className='flex items-center justify-center gap-4'>
          {navigation.length > 0 ? (
            navigation.map((item) => (
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
            ))
          ) : (
            <li className='text-sm text-zinc-500'>No navigation items available</li>
          )}
        </ul>
      </nav>
      <div className='hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0'/>
      <Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={100}/>
      <h1 className='z-10 text-2xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-6xl whitespace-nowrap bg-clip-text'>
        {infoSite[0].name.length > 0 ? infoSite[0].name : siteName ?? 'Nguyen Hong The Developer'}
      </h1>
      <div className='hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0'/>
      <div className='my-16 text-center animate-fade-in'>
        <h2 className='text-sm text-zinc-500'>
          {infoSite[0].introSafe.length > 0 ? HTMLReactParser(infoSite[0].introSafe) : 'Đang cập nhật...'}
        </h2>
      </div>
    </div>
  )
}
