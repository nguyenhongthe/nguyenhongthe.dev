// app/page.tsx

import Link from 'next/link'
import React from 'react'
import Particles from '@/components/particles'
import type { Metadata } from 'next'
import { siteDescription, siteName, siteUrlPrefix } from '@/constrains'
import { getInfoCommon } from "@/apis/info_api"
import { type InfoProps } from '@/types/info'
import HTMLReactParser from 'html-react-parser'
import type { MenuProps } from "@/types/listing"
import { getMenuList } from "@/apis/menu_api"

const Home = async () => {
    const navigation: MenuProps[] = await getMenuList().catch(() => [])
    const info_common: InfoProps[] = await getInfoCommon().catch(() => [])

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
                {info_common.length > 0 ? info_common[0].name || 'Nguyen Hong The Dev' : 'Nguyen Hong The Dev'}
            </h1>
            <div className='hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0'/>
            <div className='my-16 text-center animate-fade-in'>
                <h2 className='text-sm text-zinc-500'>
                    {info_common.length > 0 ? HTMLReactParser(info_common[0].introSafe || 'Đang cập nhật...') : 'Đang cập nhật...'}
                </h2>
            </div>
        </div>
    )
}

export default Home

export async function generateMetadata(): Promise<Metadata> {
    const info_common: InfoProps[] = await getInfoCommon().catch(() => [])
    const title = info_common.length > 0 ? info_common[0].metaTitle : siteName
    const description = info_common.length > 0 ? info_common[0].metaDescription : siteDescription
    const ogImg = info_common.length > 0 ? info_common[0].metaImage : undefined

    return {
        metadataBase: new URL(siteUrlPrefix),
        title,
        description,
        openGraph: {
            url: siteUrlPrefix,
            type: 'website',
            images: ogImg ? [ogImg] : [],
        },
        alternates: {
            canonical: siteUrlPrefix
        },
        twitter: {
            title,
            description,
            card: "summary_large_image",
            images: ogImg ? [ogImg] : [],
        },
    }
}

