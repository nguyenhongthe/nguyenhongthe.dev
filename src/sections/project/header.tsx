// src/sections/project/header.tsx

'use client'
import { ArrowLeft, Eye } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import {type TechnologyProps} from "@/src/types/project";

interface Props {
  project: {
    technology: TechnologyProps[];
    projectUrl: string;
    name: string;
    descriptionSafe: string;
    publishedAt: string;
    source: string;
  };

  views: number;
}

export const Header: React.FC<Props> = ({ project, views }) => {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIntersecting] = useState(true)

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
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Hàm format ngày tháng nhất quán
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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
              {Intl.NumberFormat('en-US', {notation: 'compact'}).format(
                  views
              )}
            </span>
            </div>

            <Link
                href='/projects/'
                className={`duration-200 hover:font-medium ${isIntersecting
                    ? ' text-zinc-400 hover:text-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-900'
                } `}
            >
              <ArrowLeft className='w-6 h-6 '/>
            </Link>
          </div>
        </div>
        <div className='container mx-auto relative isolate overflow-hidden  py-24 sm:py-32'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center'>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl font-display'>
                {project.name}
              </h1>
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
