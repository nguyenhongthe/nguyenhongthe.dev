import type { ProjectListingProps } from '../../types/project'
import { Eye } from 'lucide-react'
import DayjsFlexibleAgo from '../../components/dayjs-flexible-ago'
import React from 'react'
import HTMLReactParser, { domToReact, Element } from 'html-react-parser'
import Link from 'next/link'

export type ArticleProps = {
  project: ProjectListingProps
  views: string
}

export const Article: React.FC<ArticleProps> = ({ project, views }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode instanceof Element && domNode.name === 'a') {
        // Thay thế thẻ a bằng span để tránh lồng a trong a
        return <span className="text-zinc-400 hover:text-zinc-200">{domToReact(domNode.children, options)}</span>
      }
    }
  }

  return (
    <article className='p-4 md:p-8'>
      <div className='flex justify-between gap-2 items-center'>
        <span className='text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange'>
          <time dateTime={new Date(project.publishedAt).toISOString()}>
            <DayjsFlexibleAgo dateStr={project.publishedAt} />
          </time>
        </span>
        <span className='text-zinc-500 text-xs flex items-center gap-1'>
          <Eye className='w-4 h-4' />
          {views === undefined ? 0 : views}
        </span>
      </div>
      <Link href={`/projects/${project.slug}`}>
        <h2 className='z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display cursor-pointer hover:text-zinc-100'>
          {project.name}
        </h2>
      </Link>
      {project.excerptSafe.length > 0 ? (
        <div className='z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200'>
          {HTMLReactParser(project.excerptSafe || '', options)}
        </div>
      ) : (
        <div className='z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200'>
          Đang cập nhật...
        </div>
      )}
    </article>
  )
}
