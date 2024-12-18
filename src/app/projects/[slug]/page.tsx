// app/projects/[slug]/page.tsx

import React from 'react'
import { Header } from '@/src/sections/project/header'
import { getProjectDetail } from '@/src/apis/project_api'
import { type ProjectDetailProps } from '@/src/types/project'
import HTMLReactParser from 'html-react-parser'
import Image from 'next/image'
import { getMediaURL } from '@/src/utils/common'
import type { Metadata } from 'next'
import { siteName, siteUrlPrefix } from '../../../../constrains'
import CalcViewsWrapper from '../../../sections/project/client-calc-views'
import { Footer } from '@/src/sections/project/footer'

// Component trang chi tiết dự án
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
  const item: ProjectDetailProps = await getProjectDetail(slug)

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


export default async function Page(
  { params }: Props) {
  const slug = (await params).slug
  const project: ProjectDetailProps = await getProjectDetail(slug)

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={project.numViews} />
      <CalcViewsWrapper code={project.code} />

      <section className="px-2 py-12 mx-auto prose lg:prose-xl prose-zinc prose-quoteless">
        {project.featuredImage
          ? (
            <div className="relative w-full aspect-video">
              <Image
                src={getMediaURL(project.featuredImage)}
                alt={project.name}
                width={1200}
                height={630}
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-cover"
                loading="eager"
                priority={true}
              />
            </div>
          )
          : (
            <div className="relative w-full aspect-video">
              <Image
                src='/img/og.png'
                alt={project.name}
                width={1200}
                height={630}
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-cover"
                loading="eager"
                priority={true}
              />
            </div>
          )
        }
      </section>

      <article className="px-2 py-3 mx-auto prose lg:prose-xl prose-zinc prose-quoteless">
        {project.contentSafe.length > 0
          ? HTMLReactParser(project.contentSafe || '')
          : 'Đang cập nhật...'
        }
      </article>
      <Footer />
    </div>
  )
}
