import type { ProjectListingProps } from '../../types/project'
import { Eye } from 'lucide-react'
import DayjsFlexibleAgo from '../../components/dayjs-flexible-ago'
import React from 'react'
import HTMLReactParser from 'html-react-parser'

export type ArticleProps = {
  project: ProjectListingProps
  views: string
}

export const Article: React.FC<ArticleProps> = ({ project, views }) => {
  return (
    <article className='p-4 md:p-8'>
      <div className='flex justify-between gap-2 items-center'>
        <span className='text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange'>
          {project.publishedAt ? (
            <time dateTime={new Date(project.publishedAt).toISOString()}>
              <DayjsFlexibleAgo dateStr={project.publishedAt} />
            </time>
          ) : (
            'SOON...'
          )}
        </span>
        <span className='text-zinc-500 text-xs flex items-center gap-1'>
          <Eye className='w-4 h-4' />
          {views === undefined ? 0 : views}
        </span>
      </div>
      <h2 className='z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display'>
        {project.name}
      </h2>
      {project.excerptSafe.length > 0 ? (
        <div className='z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200'>
          {HTMLReactParser(project.excerptSafe || '')}
        </div>
      ) : (
        <div className='z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200'>
          <p>Update coming soon...</p>
        </div>
      )}
    </article>
  )
}
