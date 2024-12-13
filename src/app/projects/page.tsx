import Link from 'next/link'
import React from 'react'
import type { Metadata } from 'next'
import { siteDescription, defaultOgImage, siteUrlPrefix, siteCanonicalUrlPrefix } from '../../../constrains'
import { type ProjectFeaturedProps, ProjectListingProps } from '../../types/project'
import { Card } from '../../components/card'
import { Article } from './article'
import { ArrowLeft } from 'lucide-react'
import { getProjectsFeatured, getProjectsListing } from '../../apis/project_api'
import { type MenuProps } from '../../types/listing'
import { getMenuList } from '../../apis/menu_api'

export default async function ProjectsPage() {
  const navigation: MenuProps[] = await getMenuList()
  const projectListing: ProjectListingProps[] = await getProjectsListing()
  const projectFeatured: ProjectFeaturedProps[] = await getProjectsFeatured()

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
            <ArrowLeft className='w-6 h-6' />
          </Link>
        </div>
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
                <Article project={mainFeatured} views={mainFeatured.numViews} />
              </Link>
            </Card>
          )}

          <div className='flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0'>
            {secondaryFeatured.map((project) => (
              <Card key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <Article project={project} views={project.numViews} />
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className='hidden w-full h-px md:block bg-zinc-800' />

        {/* Other Projects Grid */}
        <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3'>
          {[0, 1, 2].map((columnIndex) => (
            <div key={columnIndex} className='grid grid-cols-1 gap-4'>
              {nonFeaturedProjects
                .filter((_, index) => index % 3 === columnIndex)
                .map((project) => (
                  <Card key={project.slug}>
                    <Link href={`/projects/${project.slug}`}>
                      <Article project={project} views={project.numViews} />
                    </Link>
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </div>
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
    canonical: siteCanonicalUrlPrefix + '/projects/'
  }
}
