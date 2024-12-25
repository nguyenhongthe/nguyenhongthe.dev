// app/projects/technology/[slug]/page.tsx

import React from 'react'
import { getTechnologyDetail } from '@/src/apis/project_api'
import { TechnologyDetailProps } from '@/src/types/project'
import HTMLReactParser from 'html-react-parser'
import type { Metadata } from 'next'
import { siteName, siteUrlPrefix } from '../../../../../constrains'
import { Footer } from '@/src/sections/project/footer'
import { Card } from '@/src/components/card'
import Link from 'next/link'
import { Article } from '@/src/app/projects/article'
import Navigation from '@/src/components/Navigation'
import { getMenuList } from '@/src/apis/common_api'

// Component trang chi tiết công nghệ trong dự án
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(
  { params }: Props) {
  const slug = (await params).slug
  const tech: TechnologyDetailProps = await getTechnologyDetail(slug)
  const navigation = await getMenuList()

  return (
    <div className='relative pb-5'>
      <header>
        <Navigation navigation={navigation}/>
      </header>

      <div className='px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32'>
        <div className='w-full mx-auto lg:mx-0'>
          <h1 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
            Some of my projects use {tech.name}
          </h1>
          <div className='mt-4 text-zinc-400'>
            {HTMLReactParser(tech.descriptionSafe || '')}
          </div>
        </div>

        <div className='hidden w-full h-px md:block bg-zinc-800'/>

        {/* Other Projects Grid */}
        <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3'>
          {[0, 1, 2].map((columnIndex) => (
            <div key={columnIndex} className='grid grid-cols-1 gap-4'>
              {tech.projects
                .filter((_, index) => index % 3 === columnIndex)
                .map((project) => (
                  <Card key={project.slug}>
                    <Link href={`/projects/${project.slug}`}>
                      <Article project={project} views={project.numViews}/>
                    </Link>
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </div>

      <footer className="relative bottom-0 z-50">
        <Footer/>
      </footer>

    </div>
  )
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
  const item: TechnologyDetailProps = await getTechnologyDetail(slug)

  const title = item.metaTitle.length > 0 ? item.metaTitle : item.name + ' - ' + siteName
  return {
    metadataBase: new URL(siteUrlPrefix),
    title,
    description: item.openGraph.description,
    openGraph: {
      ...item.openGraph,
      type: 'website'
    },
    alternates: {
      canonical: item.url
    },
    twitter: {
      title,
      description: item.openGraph.description,
      card: 'summary_large_image',
      images: item.openGraph.images
    },
  }
}
