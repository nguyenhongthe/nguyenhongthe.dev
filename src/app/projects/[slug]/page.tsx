// app/projects/[slug]/page.tsx
import { Header } from '../../../sections/project/header'
import { getProjectDetail } from '../../../apis/project_api'
import { ProjectDetailProps } from "@/src/types/project"
import HTMLReactParser from "html-react-parser"
import Image from 'next/image'
import { getMediaURL } from '@/src/utils/common'
import type { Metadata, ResolvingMetadata } from 'next'
import { siteName, siteUrlPrefix } from '../../../../constrains'
import CalcViewsWrapper from "../../../sections/project/client-calc-views"
import { Footer } from '@/src/sections/project/footer'

interface NextProps {
    params: { slug: string }
}

const ProjectDetail = async ({ params }: NextProps) => {
    const { slug } = await params
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
                                fill
                                sizes="(max-width: 800px) 100vw, 800px"
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
                                fill
                                sizes="(max-width: 800px) 100vw, 800px"
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
        <Footer project={project} />
        </div>
    )
}

export default ProjectDetail

export async function generateMetadata (
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const { slug } = await params
    const item: ProjectDetailProps = await getProjectDetail(slug)
  
    const title = item.metaTitle.length > 0 ? item.metaTitle : item.name + ' - ' + siteName
    const description = item.metaDescription.length > 0 ? item.metaDescription : item.excerptSafe
    const images = getMediaURL(item.metaImage).length > 0 ? [getMediaURL(item.metaImage)] : []
    const url = item.fullUrl
    return {
      metadataBase: new URL(siteUrlPrefix),
      title,
      description,
      openGraph: {
        title,
        description,
        images,
        url,
        type: 'website'
      },
      alternates: {
        canonical: item.fullUrl
      }
    }
  }
