import Link from 'next/link'
import React from 'react'
import Particles from '@/components/particles'
import type { Metadata } from 'next'
import { defaultOgImage, siteUrlPrefix } from '@/constrains'
import { getMenuList } from '@/apis/menu_api'
import { type MenuProps } from '@/types/listing'
import {getInfoCommon} from "@/apis/info_api"
import { type InfoProps } from '@/types/info'
import HTMLReactParser from 'html-react-parser'

const About = async ({
                        params
                    }: {
    params: { slug: string }
}) => {
    const navigation: MenuProps[] = await getMenuList()
    const info_common: InfoProps[] = await getInfoCommon()

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
            <nav className='my-16 animate-fade-in'>
                <ul className='flex items-center justify-center gap-4'>
                    <Link
                        key=''
                        href='/'
                        title='Home'
                        className='text-sm duration-500 text-zinc-500 hover:text-zinc-300'
                    >
                        Home
                    </Link>
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
            <div className='hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0' />
            <Particles
                className='absolute inset-0 -z-10 animate-fade-in'
                quantity={100}
            />
            <h1 className='z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text '>

                {info_common[0].name}
            </h1>

            <div className='hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0' />
            <div className='my-16 text-center animate-fade-in'>
                <h2 className='text-sm text-zinc-500 '>
                    {info_common[0].introSafe.length > 0
                        ? HTMLReactParser(info_common[0].introSafe || '')
                        : 'Đang cập nhật...'
                    }
                </h2>
            </div>
        </div>
    )
}

export default About

export const metadata: Metadata = {
    title: 'Nguyen Hong The - Serverless Developer',
    description: 'Hi, my name is Nguyen Hong The, I\'m building serverless and open source solutions at VN Spring.',
    openGraph: {
        url: siteUrlPrefix + 'about',
        type: 'website',
        images: [defaultOgImage]
    },
    alternates: {
        canonical: siteUrlPrefix + 'about'
    }
}
