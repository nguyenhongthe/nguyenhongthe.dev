import Link from "next/link";
import React from "react";
import { Navigation } from "@/components/nav";
import { ProjectFeaturedProps, ProjectListingProps } from "@/types/project";
import { Card } from "@/components/card";
import { Article } from "./article";
import {ArrowLeft, Eye} from "lucide-react";
import { getProjectsFeatured, getProjectsListing } from "@/apis/project_api";
import DayjsFlexibleAgo from "@/components/dayjs-flexible-ago";
import HTMLReactParser from "html-react-parser";
import type {MenuProps} from "@/types/listing";
import {getMenuList} from "@/apis/menu_api";


export default async function ProjectsPage() {
  const navigation: MenuProps[] = await getMenuList()
  const projectListing: ProjectListingProps[] = await getProjectsListing();
  const projectFeatured: ProjectFeaturedProps[] = await getProjectsFeatured();

  // Lấy tất cả các project đã publish và sắp xếp theo thời gian, mới nhất trước
  const allProjects = projectListing.filter((p) => p.publishedAt);

  // Process featured projects
  const featured = projectFeatured.find(
      (project) => project.slug === "myghost"
  );

  const top2 = projectFeatured.find(
      (project) => project.slug === "nguyenhongthe-net"
  );

  const top3 = projectFeatured.find(
      (project) => project.slug === "contact-form-api"
  );

  const sorted = allProjects
      .filter((p) => p.publishedAt)
      .filter(
          (project) =>
              project.slug !== featured?.slug &&
              project.slug !== top2?.slug &&
              project.slug !== top3?.slug
      )
      .sort(
          (a, b) =>
              new Date(b.publishedAt ?? Number.POSITIVE_INFINITY).getTime() -
              new Date(a.publishedAt ?? Number.POSITIVE_INFINITY).getTime()
      );


  return (
      <div className="relative pb-16">
        <header>
          <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
            <div className="flex justify-between gap-8">
              {navigation.map((item) => (
                  <Link
                      key={item.order}
                      href={`${item.url}`}
                      title={item.name}
                      className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
                  >
                    {item.name}
                  </Link>
              ))}
            </div>

            <Link
                href="/"
                className="duration-200 text-zinc-300 hover:text-zinc-100"
            >
              <ArrowLeft className="w-6 h-6 "/>
            </Link>
          </div>
        </header>
        <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Projects
            </h1>
            <p className="mt-4 text-zinc-400">
              Some of the projects are from work and some are on my own time.
            </p>
          </div>
          <div className="w-full h-px bg-zinc-800"/>

          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
            {featured && (
                <Card>
                  {/*<Link href={`/projects/${featured.slug}`}>*/}
                  <article className="relative w-full h-full p-4 md:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-zinc-100">
                        <time dateTime={new Date(featured.publishedAt).toISOString()}>
                          <DayjsFlexibleAgo dateStr={featured.publishedAt}/>
                        </time>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4"/>
                        {featured.numViews}
                    </span>
                    </div>
                    <Link href={`/projects/${featured.slug}`}>
                      <h2
                          id="featured-post"
                          className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                      >
                        {featured.name}
                      </h2>
                    </Link>
                    {featured.excerptSafe.length > 0
                        ? (
                            <div
                                className="mt-4 mb-8 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                              {HTMLReactParser(featured.excerptSafe || '')}
                            </div>
                        )
                        : (
                            <div
                                className="mt-4 mb-8 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                              Đang cập nhật...
                            </div>
                        )}
                    <div className="mt-4 absolute bottom-4 md:bottom-8">
                      <div className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                        Read more <span aria-hidden="true">&rarr;</span>
                      </div>
                    </div>
                  </article>
                  {/*</Link>*/}
                </Card>
            )}

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
              {[top2, top3].map(
                  (project) =>
                      project && (
                          <Card key={project.slug}>
                            <Article project={project} views={project.numViews ?? 0}/>
                          </Card>
                      )
              )}
            </div>
          </div>

          <div className="hidden w-full h-px md:block bg-zinc-800"/>

          <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
            <div className="grid grid-cols-1 gap-4">
              {sorted
                  .filter((_, i) => i % 3 === 0)
                  .map((project) => (
                      <Card key={project.slug}>
                        <Article project={project} views={project.numViews ?? 0}/>
                      </Card>
                  ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sorted
                  .filter((_, i) => i % 3 === 1)
                  .map((project) => (
                      <Card key={project.slug}>
                        <Article project={project} views={project.numViews ?? 0}/>
                      </Card>
                  ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sorted
                  .filter((_, i) => i % 3 === 2)
                  .map((project) => (
                      <Card key={project.slug}>
                        <Article project={project} views={project.numViews ?? 0}/>
                      </Card>
                  ))}
            </div>
          </div>
        </div>
      </div>
  );
}
