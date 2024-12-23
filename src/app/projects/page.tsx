// src/app/projects/page.tsx

import Link from 'next/link'
import React from 'react'
import type { Metadata } from 'next'
import { defaultOgImage, siteDescription, siteUrlPrefix } from '../../../constrains'
import { ProjectListingProps } from '../../types/project'
import { Card } from '../../components/card'
import { Article } from './article'
import { Eye } from 'lucide-react'
import { getProjectsFeatured, getProjectsListing } from '../../apis/project_api'
import { type MenuProps } from '../../types/common'
import { getMenuList } from '../../apis/common_api'
import DayjsFlexibleAgo from '@/src/components/dayjs-flexible-ago'
import HTMLReactParser from 'html-react-parser'
import { Footer } from '@/src/sections/project/footer'
import Navigation from '@/src/components/Navigation'

export default async function ProjectsPage() {
  const navigation: MenuProps[] = await getMenuList()
  const projectListing: ProjectListingProps[] = await getProjectsListing()
  const projectFeatured: ProjectListingProps[] = await getProjectsFeatured()

  // Sắp xếp featured projects theo thời gian mới nhất
  const sortedFeatured = projectFeatured
    .filter((p) => p.publishedAt)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

  // Lấy project featured đầu tiên cho phần showcase chính
  const mainFeatured = sortedFeatured[0]
  // Lấy 2 featured projects tiếp theo cho phần showcase phụ
  const secondaryFeatured = sortedFeatured.slice(1, 3)

  // Lọc các projects không featured và sắp xếp theo thời gian
  const nonFeaturedProjects = projectListing
    .filter((p) => p.publishedAt)
    .filter((p) => !sortedFeatured.some(f => f.slug === p.slug))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  return (
    <div className='relative pb-16'>
      <header>
        <Navigation navigation={navigation} />
      </header>

      <div className='px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32'>
        <div className='max-w-2xl mx-auto lg:mx-0'>
          <h1 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
            Some of my small projects
          </h1>
          <p className='mt-4 text-zinc-400'>
            Some of the projects are from work and some are on my own time.
          </p>
        </div>

        <div className='w-full h-px bg-zinc-800' />

        {/* Featured Projects Section */}
        <div className='grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2'>
          {mainFeatured && (
            <Card key={mainFeatured.slug}>
              <Link href={`/projects/${mainFeatured.slug}`}>
                <article className='p-4 md:p-8'>
                  <div className='flex justify-between gap-2 items-center'>
                    <span
                      className='text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange'>
                      {mainFeatured.publishedAt ? (
                        <time dateTime={new Date(mainFeatured.publishedAt).toISOString()}>
                          <DayjsFlexibleAgo dateStr={mainFeatured.publishedAt}/>
                        </time>
                      ) : (
                        'SOON...'
                      )}
                    </span>
                    <span className='text-zinc-500 text-xs flex items-center gap-1'>
                      <Eye className='w-4 h-4'/>
                      {mainFeatured.numViews === undefined ? 0 : mainFeatured.numViews}
                    </span>
                  </div>
                  <h2 className='z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display'>
                    {mainFeatured.name}
                  </h2>
                  {mainFeatured.excerptSafe.length > 0 ? (
                    <div className='z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200'>
                      {HTMLReactParser(mainFeatured.excerptSafe || '')}
                    </div>
                  ) : (
                    <div className='z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200'>
                      <p>Update coming soon...</p>
                    </div>
                  )}
                  <div className="absolute bottom-4 md:bottom-8">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>
          )}

          <div className='flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0'>
            {secondaryFeatured.map((project) => (
              <Card key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <Article project={project} views={project.numViews}/>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className='hidden w-full h-px md:block bg-zinc-800'/>

        {/* Other Projects Grid */}
        <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3'>
          {[0, 1, 2].map((columnIndex) => (
            <div key={columnIndex} className='grid grid-cols-1 gap-4'>
              {nonFeaturedProjects
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
      <Footer />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Projects - Nguyen Hong The Developer',
  description: 'Some of the projects are from work and some are on my own time.',
  openGraph: {
    title: 'Projects - Nguyen Hong The Developer',
    description: siteDescription,
    url: siteUrlPrefix + '/projects/',
    type: 'website',
    images: [defaultOgImage]
  },
  alternates: {
    canonical: siteUrlPrefix + '/projects/'
  },
  twitter: {
    site: '@realTheNguyen',
    card: 'summary_large_image',
    title: 'Projects - Nguyen Hong The Developer',
    description: siteDescription,
    images: [defaultOgImage]
  }
}
