// app/projects/[slug]/page.tsx

import { Header } from "./header";
import { getProjectDetail } from "@/apis/project_api";
import { ProjectDetailProps } from "@/types/project";
import HTMLReactParser from "html-react-parser";
import Image from 'next/image'
import { getMediaURL } from '@/utils/common'
import type { Metadata, ResolvingMetadata } from "next";
import { siteName, siteUrlPrefix } from "@/constrains";
import CalcViewsWrapper from "./client-calc-views";

interface NextProps {
    params: { slug: string }
}

const ProjectDetail = async ({ params }: NextProps) => {
    const { slug } = params
    const project: ProjectDetailProps = await getProjectDetail(slug);

    return (
        <div className="bg-zinc-50 min-h-screen">
            <Header project={project} views={project.numViews}/>
            <CalcViewsWrapper code={project.code}/>

            <section className="px-2 py-12 mx-auto prose lg:prose-xl prose-zinc prose-quoteless">
                {project.featuredImage
                    ? (
                        <Image
                            src={getMediaURL(project.featuredImage)}
                            alt={project.name}
                            width={1200}
                            height={800}
                            className="object-cover w-full center-cropped"
                        />
                    )
                    : (
                        <Image
                            src='/img/og.png'
                            alt={project.name}
                            width={1200}
                            height={800}
                        />
                    )
                }
            </section>

            <section className="px-2 py-0 mx-auto prose lg:prose-xl prose-zinc prose-quoteless">
                {project && project.excerptSafe && project.excerptSafe.length > 0
                    ? HTMLReactParser(project.excerptSafe)
                    : 'Đang cập nhật...'
                }
            </section>

            <article className="px-2 py-3 mx-auto prose lg:prose-xl prose-zinc prose-quoteless">
                {project.contentSafe.length > 0
                    ? HTMLReactParser(project.contentSafe || '')
                    : 'Đang cập nhật...'
                }
            </article>
        </div>
    );
}

export default ProjectDetail;

export async function generateMetadata(
    {params}: { params: { slug: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const {slug} = params
    const meta: ProjectDetailProps = await getProjectDetail(slug)
    return {
        metadataBase: new URL(siteUrlPrefix),
        title: meta.metaTitle,
        description: meta.metaDescription,
        openGraph: {
            url: siteUrlPrefix + '/projects/' + slug,
            type: 'website',
            images: getMediaURL(meta.metaImage)
        },
        alternates: {
            canonical: siteUrlPrefix + '/projects/' + slug
        },
        twitter: {
            title: meta.metaTitle,
            description: meta.metaDescription,
            card: "summary_large_image",
            images: getMediaURL(meta.metaImage)
        }
    }
}
