// src/sections/project/header.tsx

'use client'

import { Eye, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { type TechnologyProps } from '@/src/types/project'
import { siteUrlPrefix } from '../../../constrains'
import { formatDate, getProjectStatus } from '@/src/utils/common'
import { useNavigation } from '@/src/hooks/useNavigation'

interface Props {
  project: {
    technology: TechnologyProps[]
    projectUrl: string
    name: string
    descriptionSafe: string
    projectStatus: string
    publishedAt: string
    source: string
  }

  views: number;
}

export const Header: React.FC<Props> = ({ project, views }) => {
  const { ref, isIntersecting, navigation } = useNavigation()

  const links: { label: string; href: string }[] = []
  if (project.source) {
    links.push({
      label: 'GitHub',
      href: project.source
    })
  }
  if (project.projectUrl) {
    links.push({
      label: 'Website',
      href: project.projectUrl
    })
  }

  return (
    <header
      ref={ref}
      className='relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black'
    >
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${isIntersecting
          ? 'bg-zinc-900/0 border-transparent'
          : 'bg-white/10  border-zinc-200 lg:border-transparent'
        }`}
      >
        <div className='container flex flex-row-reverse items-center justify-between p-6 mx-auto'>
          <div className='flex justify-between gap-8'>
            <span
              title='View counter for this page'
              className={`duration-200 hover:font-medium flex items-center gap-1 ${isIntersecting
                ? ' text-zinc-400 hover:text-zinc-100'
                : 'text-zinc-600 hover:text-zinc-900'
              } `}
            >
              <Eye className='w-5 h-5'/>{' '}
              {Intl.NumberFormat('en-US', { notation: 'compact' }).format(
                views
              )}
            </span>
            <span
              title='Header menu for this page'
              className={`duration-200 hover:font-medium flex items-center justify-between gap-8 ${isIntersecting
                ? ' text-zinc-400 hover:text-zinc-100'
                : 'text-zinc-600 hover:text-zinc-900'
              } `}
            >
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
            </span>
          </div>

          <Link
            href={siteUrlPrefix}
            className={`duration-200 hover:font-medium ${isIntersecting
              ? ' text-zinc-400 hover:text-zinc-100'
              : 'text-zinc-600 hover:text-zinc-900'
            } `}
          >
            <Home className='w-6 h-6 '/>
          </Link>
        </div>
      </div>
      <div className='container mx-auto relative isolate overflow-hidden  py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl font-display'>
              {project.name}
            </h1>
            <span
              className="mt-6 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xl font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {getProjectStatus(project.projectStatus)}
            </span>
            <div className='mt-6 text-lg leading-8 text-zinc-300'>
              {project.descriptionSafe.length > 0
                ? HTMLReactParser(project.descriptionSafe || '')
                : 'Đang cập nhật...'}
            </div>
          </div>

          <div className='mx-auto max-w-2xl mt-6 text-xs text-zinc-100'>
            {project.publishedAt !== undefined
              ? (
                <time dateTime={new Date(project.publishedAt).toISOString()}>
                  <span aria-hidden='true'> &rarr; </span>
                  {formatDate(project.publishedAt)}
                </time>
              )
              : (
                <span>SOON</span>
              )}
          </div>

          <div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
            <div
              className='grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'>
              {links.map((link) => (
                <Link target='_blank' key={link.label} href={link.href} rel='noreferrer'>
                  {link.label} <span aria-hidden='true'>&rarr;</span>
                </Link>
              ))}
            </div>
          </div>

          <section className="px-2 py-12 mx-auto prose lg:prose-xl prose-zinc prose-quoteless">
            <div className="flex flex-wrap gap-2">
              {project.technology.map((tech: TechnologyProps) => (
                <a
                  key={tech.slug}
                  href={tech.url}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium leading-4 text-white bg-zinc-500 rounded-full no-underline"
                >
                  {tech.name}
                </a>
              ))}
            </div>
          </section>

        </div>
      </div>
    </header>
  )
}
